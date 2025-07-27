// src/utils/mockData.js

/**
 * Generate mock AQI data for a given city with realistic environmental metrics.
 *
 * @param {string} location - Name of the city or "Current Location"
 * @returns {object} - Mock AQI and pollutant breakdown
 */
export const generateMockAQIData = (location) => {
  const baseAQI = {
    'Delhi': 180,
    'Mumbai': 120,
    'Bangalore': 80,
    'Chennai': 95,
    'Kolkata': 160,
    'Hyderabad': 110,
    'Pune': 105,
    'Ahmedabad': 140,
    'Jaipur': 130,
    'Lucknow': 170,
    'Bhopal': 125,
    'Current Location': 90,
  };

  const fallbackAQI = 100 + Math.floor(Math.random() * 100);
  const aqi = baseAQI[location] || fallbackAQI;

  return {
    location,
    aqi,
    lastUpdated: new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    temperature: Math.floor(Math.random() * 15) + 20,
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 20) + 5,
    visibility: Math.floor(Math.random() * 8) + 2,
    pollutants: {
      pm25: Math.floor(aqi * 0.6 + Math.random() * 20),
      pm10: Math.floor(aqi * 0.8 + Math.random() * 30),
      o3: Math.floor(aqi * 0.4 + Math.random() * 15),
      no2: Math.floor(aqi * 0.3 + Math.random() * 10),
      so2: Math.floor(aqi * 0.2 + Math.random() * 8),
      co: Math.floor(aqi * 0.1 + Math.random() * 5)
    }
  };
};

/**
 * Generate hourly forecasted AQI data for the next 24 hours.
 * Simulates a realistic day-night cycle with higher AQI during afternoons and evenings.
 *
 * @returns {Array} - Forecast data for 24 hours
 */
export const generateMockForecastData = () => {
  const forecast = [];
  const currentHour = new Date().getHours();

  for (let i = 0; i < 24; i++) {
    const hour = (currentHour + i) % 24;

    let label;
    if (hour === 0) label = '12 AM';
    else if (hour < 12) label = `${hour} AM`;
    else if (hour === 12) label = '12 PM';
    else label = `${hour - 12} PM`;

    let base = 100;
    if (hour >= 6 && hour <= 10) base = 80;
    else if (hour >= 11 && hour <= 16) base = 150;
    else if (hour >= 17 && hour <= 21) base = 180;
    else base = 90;

    const aqi = Math.max(20, base + Math.floor(Math.random() * 40) - 20);

    forecast.push({
      time: label,
      aqi
    });
  }

  return forecast;
};
