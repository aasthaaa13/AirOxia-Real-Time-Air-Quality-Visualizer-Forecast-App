import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Wind, Eye, Droplets, Thermometer, MapPin } from 'lucide-react';
import LocationSearch from '@/components/LocationSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMockAQIData } from '@/utils/mockData';
import { getAQIInfo } from '@/utils/aqiUtils';
import AQIExposureDial from '@/components/AQIExposureDial';

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState('Bhopal');
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = generateMockAQIData(currentLocation);
      setAqiData(data);
      setLoading(false);
    }, 1000);
  }, [currentLocation]);

  const handleLocationSelect = (location) => {
    setCurrentLocation(location);
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

  const aqiInfo = getAQIInfo(aqiData.aqi);

  const pollutantCards = [
    { pollutant: 'PM2.5', value: aqiData.pollutants.pm25, unit: 'μg/m³' },
    { pollutant: 'PM10', value: aqiData.pollutants.pm10, unit: 'μg/m³' },
    { pollutant: 'O3', value: aqiData.pollutants.o3, unit: 'μg/m³' },
    { pollutant: 'NO2', value: aqiData.pollutants.no2, unit: 'μg/m³' },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="space-y-8"
    >
      <Helmet>
        <title>Dashboard - AirWatch India</title>
        <meta name="description" content={`Current air quality in ${currentLocation}. Real-time AQI, pollutant levels, and weather conditions.`} />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Latest report for rural & small-town areas.</p>
      </div>

      <LocationSearch
        onLocationSelect={handleLocationSelect}
        currentLocation={currentLocation}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Exposure Dial */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <AQIExposureDial
                exposure={Math.round((aqiData.aqi / 500) * 100)}
                aqiInfo={aqiInfo}
              />
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current Location</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <MapPin className="mx-auto w-10 h-10 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{currentLocation}</p>
              <p className="text-sm text-muted-foreground">
                Last Updated: {aqiData.lastUpdated}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pollutants */}
          <Card>
            <CardHeader>
              <CardTitle>Key Pollutants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pollutantCards.map((item, index) => (
                  <motion.div
                    key={item.pollutant}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="text-center">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {item.pollutant}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.unit}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card>
            <CardHeader>
              <CardTitle>Weather Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Wind */}
                <Card className="bg-secondary">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Wind className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="font-bold">{aqiData.windSpeed} km/h</p>
                    <p className="text-xs text-muted-foreground">Wind</p>
                  </CardContent>
                </Card>

                {/* Visibility */}
                <Card className="bg-secondary">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Eye className="w-8 h-8 text-green-400 mb-2" />
                    <p className="font-bold">{aqiData.visibility} km</p>
                    <p className="text-xs text-muted-foreground">Visibility</p>
                  </CardContent>
                </Card>

                {/* Humidity */}
                <Card className="bg-secondary">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Droplets className="w-8 h-8 text-purple-400 mb-2" />
                    <p className="font-bold">{aqiData.humidity}%</p>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                  </CardContent>
                </Card>

                {/* Temperature */}
                <Card className="bg-secondary">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Thermometer className="w-8 h-8 text-orange-400 mb-2" />
                    <p className="font-bold">{aqiData.temperature}°C</p>
                    <p className="text-xs text-muted-foreground">Temp.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
