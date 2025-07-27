import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  MapPin, Layers, Wind, Thermometer
} from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const cities = [
  { name: "Delhi NCR", aqi: 301 },
  { name: "Mumbai", aqi: 156 },
  { name: "Kolkata", aqi: 178 },
  { name: "Chennai", aqi: 89 },
  { name: "Bangalore", aqi: 67 }
];

const getAQIColor = (aqi) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-red-900';
};

const Map = () => {
  const [type, setType] = useState('pollution');

  const switchType = (view) => {
    setType(view);
    toast({ title: 'Map Updated', description: `Switched to ${view} view` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween', duration: 0.5 }}
      className="space-y-8"
    >
      <Helmet>
        <title>Pollution Map - AirWatch India</title>
        <meta name="description" content="Heatmap and AQI levels for major Indian cities." />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Pollution Map</h1>
        <p className="text-muted-foreground">Live AQI hotspots across India.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {[
          { icon: Layers, label: 'Pollution' },
          { icon: Wind, label: 'Wind Patterns' },
          { icon: Thermometer, label: 'Temperature' }
        ].map(({ icon: Icon, label }) => (
          <Button
            key={label}
            onClick={() => switchType(label.toLowerCase())}
            variant={type === label.toLowerCase() ? 'default' : 'outline'}
            className="flex-shrink-0"
          >
            <Icon size={16} className="mr-2" />
            {label}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative h-96 bg-secondary rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1694300535222-a258dc712d12"
              alt="Pollution heatmap"
              className="w-full h-full object-cover opacity-80"
            />
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  top: `${30 + (i % 2) * 20}%`,
                  left: `${20 + i * 15}%`
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.2 }}
              >
                <div className={`w-4 h-4 rounded-full ${getAQIColor(city.aqi)} border-2 border-white shadow`} />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {city.name}: {city.aqi}
                </div>
              </motion.div>
            ))}

            <div className="absolute top-4 right-4 bg-popover/80 backdrop-blur-md p-3 rounded-lg text-xs">
              <h3 className="font-semibold mb-2">AQI Scale</h3>
              {[
                { color: 'green-500', label: 'Good' },
                { color: 'yellow-500', label: 'Moderate' },
                { color: 'orange-500', label: 'Unhealthy' },
                { color: 'red-500', label: 'Very Unhealthy' }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}`} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin size={20} />
            <span>City AQI</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-between items-center p-3 bg-secondary rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${getAQIColor(city.aqi)}`} />
                <span className="font-medium">{city.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-lg">{city.aqi}</span>
                <p className="text-muted-foreground text-xs">
                  {city.aqi <= 50 ? 'Good' :
                   city.aqi <= 100 ? 'Moderate' :
                   city.aqi <= 150 ? 'Sensitive' :
                   city.aqi <= 200 ? 'Unhealthy' : 'Very Unhealthy'}
                </p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Map;
