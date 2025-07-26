import React from 'react';
import { motion } from 'framer-motion';

const AQIExposureDial = ({ exposure, aqiInfo }) => {
  // exposure is a value from 0 to 100
  const angle = (exposure / 100) * 270 - 135;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="exposure-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-green-400" />
            <stop offset="50%" className="stop-yellow-400" />
            <stop offset="100%" className="stop-red-500" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <path
          d="M 25 145 A 80 80 0 1 1 175 145"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* AQI arc */}
        <path
          d="M 25 145 A 80 80 0 1 1 175 145"
          fill="none"
          stroke="url(#exposure-gradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="497"
          strokeDashoffset={497 - (exposure / 100) * 497}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{exposure}%</span>
        <span className="text-sm text-muted-foreground">Exposure</span>
        <span className={`mt-1 text-xs font-semibold ${aqiInfo.colorClass}`}>
          ({aqiInfo.category})
        </span>
      </div>
    </div>
  );
};

export default AQIExposureDial;
