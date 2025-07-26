import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

const AQIGauge = ({ aqi = 85 }) => {
  const getRotation = (value) => {
    const percentage = Math.min(Math.max(value, 0), 500) / 500;
    return percentage * 240 - 120;
  };

  const getAQIDescription = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-green-500' };
    if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-500' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'text-orange-500' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-500' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-600' };
    return { label: 'Hazardous', color: 'text-pink-700' };
  };

  const rotation = getRotation(aqi);
  const aqiInfo = getAQIDescription(aqi);

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Background Gradient Arc */}
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="25%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="75%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path
          d="M 40 160 A 80 80 0 1 1 160 160"
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>

      {/* Inner Circle with AQI Info */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48 bg-background rounded-full flex flex-col items-center justify-center shadow-inner">
          <Wind className={`w-7 h-7 mb-2 ${aqiInfo.color}`} />
          <span className="text-4xl font-bold text-foreground">{aqi}</span>
          <span className={`text-base font-semibold ${aqiInfo.color}`}>
            {aqiInfo.label}
          </span>
        </div>
      </div>

      {/* Needle */}
      <motion.div
        className="absolute w-full h-full top-0 left-0"
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <div 
          className="absolute left-1/2 top-1/2 w-1 h-1/2 -ml-0.5"
          style={{ transformOrigin: 'top center', transform: 'translateY(-1rem) rotate(180deg)' }}
        >
          <div className="w-1 h-16 bg-foreground rounded-full"></div>
        </div>
      </motion.div>

      {/* Center Pin */}
      <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-background" />
    </div>
  );
};

export default AQIGauge;
