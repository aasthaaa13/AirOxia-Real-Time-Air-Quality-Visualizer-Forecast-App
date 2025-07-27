// Returns AQI category, color classes, and advice based on value
export const getAQIInfo = (aqi) => {
  if (aqi <= 50) {
    return {
      category: 'Good',
      colorClass: 'aqi-good',
      bgColorClass: 'aqi-good-bg',
      description: 'Air quality is excellent with minimal or no risk.',
      healthAdvice: 'Perfect time to enjoy outdoor activities!'
    };
  } else if (aqi <= 100) {
    return {
      category: 'Moderate',
      colorClass: 'aqi-moderate',
      bgColorClass: 'aqi-moderate-bg',
      description: 'Acceptable air quality, though sensitive individuals may experience slight discomfort.',
      healthAdvice: 'Sensitive groups should limit intense exertion outdoors.'
    };
  } else if (aqi <= 150) {
    return {
      category: 'Unhealthy for Sensitive Groups',
      colorClass: 'aqi-unhealthy-sensitive',
      bgColorClass: 'aqi-unhealthy-sensitive-bg',
      description: 'Sensitive individuals might experience health effects. General public is less likely affected.',
      healthAdvice: 'Avoid long outdoor exposure if you’re in a sensitive group.'
    };
  } else if (aqi <= 200) {
    return {
      category: 'Unhealthy',
      colorClass: 'aqi-unhealthy',
      bgColorClass: 'aqi-unhealthy-bg',
      description: 'Health effects may be noticeable for general population; serious effects for sensitive groups.',
      healthAdvice: 'Try to stay indoors; reduce exertion if outside.'
    };
  } else if (aqi <= 300) {
    return {
      category: 'Very Unhealthy',
      colorClass: 'aqi-very-unhealthy',
      bgColorClass: 'aqi-very-unhealthy-bg',
      description: 'Air quality is hazardous. Serious health risks for everyone.',
      healthAdvice: 'Avoid going outside. Use air purifiers indoors.'
    };
  } else {
    return {
      category: 'Hazardous',
      colorClass: 'aqi-hazardous',
      bgColorClass: 'aqi-hazardous-bg',
      description: 'Emergency conditions. Everyone is at a significant health risk.',
      healthAdvice: 'Stay indoors. Follow emergency health warnings.'
    };
  }
};

// Extracts only the AQI color class
export const getAQIColor = (aqi) => {
  const { colorClass } = getAQIInfo(aqi);
  return colorClass;
};

// Extracts only health recommendation
export const getHealthRecommendation = (aqi) => {
  const { healthAdvice } = getAQIInfo(aqi);
  return healthAdvice;
};
