// src/utils/healthTips.js

/**
 * Generate tailored health and safety tips based on the current AQI level.
 * Tips are grouped by category: protection, indoor, activities, and health.
 * Each tip includes a title, description, and priority tag.
 *
 * @param {number} aqi - The Air Quality Index value
 * @returns {Array} tips - A list of health tips objects
 */
export const getHealthTips = (aqi) => {
  const tips = [];

  // AQI: 0–50 (Good)
  if (aqi <= 50) {
    tips.push(
      {
        category: 'activities',
        title: 'Perfect for Outdoor Activities',
        description: 'Great day for jogging, cycling, or any outdoor sports. Air quality is excellent!',
        priority: 'low'
      },
      {
        category: 'health',
        title: 'Maintain Healthy Habits',
        description: 'Continue your regular exercise routine and enjoy fresh air.',
        priority: 'low'
      }
    );
  }

  // AQI: 51–100 (Moderate)
  else if (aqi <= 100) {
    tips.push(
      {
        category: 'activities',
        title: 'Normal Outdoor Activities',
        description: 'You can continue normal outdoor activities. Sensitive individuals should watch for symptoms.',
        priority: 'low'
      },
      {
        category: 'health',
        title: 'Stay Hydrated',
        description: 'Drink plenty of water and maintain good nutrition to support your immune system.',
        priority: 'medium'
      }
    );
  }

  // AQI: 101–150 (Unhealthy for Sensitive Groups)
  else if (aqi <= 150) {
    tips.push(
      {
        category: 'protection',
        title: 'Consider Wearing a Mask',
        description: 'If you have respiratory conditions, consider wearing an N95 mask when outdoors.',
        priority: 'medium'
      },
      {
        category: 'activities',
        title: 'Limit Prolonged Outdoor Exercise',
        description: 'Reduce the intensity and duration of outdoor activities, especially if you feel any discomfort.',
        priority: 'medium'
      },
      {
        category: 'indoor',
        title: 'Keep Windows Closed',
        description: 'Close windows and use air conditioning or air purifiers to maintain indoor air quality.',
        priority: 'medium'
      }
    );
  }

  // AQI: 151–200 (Unhealthy)
  else if (aqi <= 200) {
    tips.push(
      {
        category: 'protection',
        title: 'Wear N95 Masks Outdoors',
        description: 'Always wear a properly fitted N95 or P100 mask when going outside.',
        priority: 'high'
      },
      {
        category: 'activities',
        title: 'Avoid Outdoor Exercise',
        description: 'Move your workout indoors. Avoid jogging, cycling, or any strenuous outdoor activities.',
        priority: 'high'
      },
      {
        category: 'indoor',
        title: 'Use Air Purifiers',
        description: 'Run air purifiers with HEPA filters in your home, especially in bedrooms.',
        priority: 'high'
      },
      {
        category: 'health',
        title: 'Monitor Your Health',
        description: 'Watch for symptoms like coughing, throat irritation, or breathing difficulties.',
        priority: 'high'
      }
    );
  }

  // AQI: 201–300 (Very Unhealthy)
  else if (aqi <= 300) {
    tips.push(
      {
        category: 'protection',
        title: 'Essential Mask Usage',
        description: 'Never go outside without an N95 or P100 mask. Consider double masking for extra protection.',
        priority: 'high'
      },
      {
        category: 'activities',
        title: 'Stay Indoors',
        description: 'Avoid all outdoor activities. Cancel non-essential trips outside.',
        priority: 'high'
      },
      {
        category: 'indoor',
        title: 'Seal Your Home',
        description: 'Keep all windows and doors closed. Use tape to seal gaps if necessary.',
        priority: 'high'
      },
      {
        category: 'health',
        title: 'Seek Medical Attention',
        description: 'If you experience chest pain, severe coughing, or difficulty breathing, consult a doctor immediately.',
        priority: 'high'
      },
      {
        category: 'indoor',
        title: 'Create Clean Air Zones',
        description: 'Designate one room as a clean air zone with multiple air purifiers running.',
        priority: 'high'
      }
    );
  }

  // AQI: 301+ (Hazardous)
  else {
    tips.push(
      {
        category: 'protection',
        title: 'Emergency Protection Required',
        description: 'Use the highest grade respiratory protection available (P100 masks). Avoid all outdoor exposure.',
        priority: 'high'
      },
      {
        category: 'activities',
        title: 'Emergency Lockdown',
        description: 'Treat this as an emergency. Stay indoors at all times unless absolutely necessary.',
        priority: 'high'
      },
      {
        category: 'health',
        title: 'Emergency Medical Preparedness',
        description: 'Have emergency contacts ready. Seek immediate medical help for any respiratory symptoms.',
        priority: 'high'
      },
      {
        category: 'indoor',
        title: 'Maximum Air Filtration',
        description: 'Run all available air purifiers on maximum settings. Consider creating a safe room.',
        priority: 'high'
      },
      {
        category: 'health',
        title: 'Vulnerable Population Alert',
        description: 'Children, elderly, and people with health conditions should be especially protected.',
        priority: 'high'
      }
    );
  }

  // Bonus tips for poor air quality (AQI > 100)
  if (aqi > 100) {
    tips.push(
      {
        category: 'health',
        title: 'Boost Your Immunity',
        description: 'Eat foods rich in antioxidants like fruits and vegetables. Consider vitamin C supplements.',
        priority: 'medium'
      },
      {
        category: 'indoor',
        title: 'Indoor Plants',
        description: 'Add air-purifying plants like snake plants, peace lilies, or spider plants to your home.',
        priority: 'low'
      }
    );
  }

  if (aqi > 150) {
    tips.push(
      {
        category: 'health',
        title: 'Avoid Smoking',
        description: 'Absolutely avoid smoking or exposure to secondhand smoke, which will worsen air quality effects.',
        priority: 'high'
      },
      {
        category: 'protection',
        title: 'Eye Protection',
        description: 'Wear wraparound sunglasses to protect your eyes from particulate matter.',
        priority: 'medium'
      }
    );
  }

  return tips;
};
