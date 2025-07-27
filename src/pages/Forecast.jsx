import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMockForecastData } from '@/utils/mockData';
import { getAQIInfo } from '@/utils/aqiUtils';

const Forecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = generateMockForecastData();
      setForecastData(data);
      setLoading(false);
    }, 1000);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const aqiInfo = getAQIInfo(payload[0].value);
      return (
        <div className="bg-popover/90 backdrop-blur-md border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{label}</p>
          <p className={`font-semibold ${aqiInfo.colorClass}`}>AQI: {payload[0].value}</p>
          <p className="text-muted-foreground text-sm">{aqiInfo.category}</p>
        </div>
      );
    }
    return null;
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="space-y-6"
    >
      <Helmet>
        <title>AirWatch India - 24-Hour Forecast</title>
        <meta name="description" content="View 24-hour air quality forecast and trends. Plan your activities based on predicted AQI levels." />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-foreground">24-Hour Forecast</h1>
        <p className="text-muted-foreground">Air quality predictions for the next 24 hours.</p>
      </div>

      {/* AQI Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>AQI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                  <Area
                    type="monotone"
                    dataKey="aqi"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorAqi)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hourly Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Hourly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {forecastData.map((item, index) => {
                const aqiInfo = getAQIInfo(item.aqi);
                return (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-muted-foreground font-medium w-16">
                        {item.time}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${aqiInfo.colorClass.replace('text-', 'bg-')}`}></div>
                      <span className="text-foreground font-semibold">{item.aqi}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{aqiInfo.category}</span>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Forecast Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Forecast Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-muted-foreground text-sm">Peak AQI</p>
                <p className="text-2xl font-bold aqi-unhealthy">
                  {Math.max(...forecastData.map(d => d.aqi))}
                </p>
                <p className="text-xs text-muted-foreground">Expected around 2 PM</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-muted-foreground text-sm">Best Time</p>
                <p className="text-2xl font-bold aqi-good">
                  {Math.min(...forecastData.map(d => d.aqi))}
                </p>
                <p className="text-xs text-muted-foreground">Early morning hours</p>
              </div>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-primary font-medium mb-2">💡 Forecast Insight</p>
              <p className="text-muted-foreground text-sm">
                Air quality is expected to be best during early morning hours (5–7 AM).
                Plan outdoor activities accordingly and avoid peak pollution hours in the afternoon.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Forecast;
