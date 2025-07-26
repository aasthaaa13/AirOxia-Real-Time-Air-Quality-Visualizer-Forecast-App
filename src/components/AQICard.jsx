import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Wind, Thermometer, Droplets } from 'lucide-react';

const getAQIDescription = (aqi) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

const getAQIColor = (aqi) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-400';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-pink-700';
};

const AQICard = ({ aqi = 85, temperature = 28, humidity = 60, windSpeed = 10 }) => {
  const description = getAQIDescription(aqi);
  const colorClass = getAQIColor(aqi);

  return (
    <Card className="p-6 space-y-4 shadow-sm bg-card border text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Air Quality Index</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className={`text-3xl font-bold ${colorClass}`}>
          {aqi}
        </div>
      </div>

      <Progress value={(aqi / 500) * 100} className={`h-2 ${colorClass}`} />

      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground pt-2">
        <div className="flex items-center space-x-2">
          <Thermometer size={16} className="text-blue-500" />
          <span>{temperature}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets size={16} className="text-cyan-500" />
          <span>{humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind size={16} className="text-indigo-500" />
          <span>{windSpeed} km/h</span>
        </div>
      </div>
    </Card>
  );
};

export default AQICard;
