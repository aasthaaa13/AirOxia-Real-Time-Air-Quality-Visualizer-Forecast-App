import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Heart, Shield, Home, Activity, AlertTriangle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getHealthTips } from '@/utils/healthTips';
import { getAQIInfo } from '@/utils/aqiUtils';

const Tips = () => {
  const [currentAQI] = useState(156); // Replace with live AQI if available
  const [tips, setTips] = useState([]);
  const [aqiInfo, setAqiInfo] = useState({});

  useEffect(() => {
    setTips(getHealthTips(currentAQI));
    setAqiInfo(getAQIInfo(currentAQI));
  }, [currentAQI]);

  const categories = [
    { icon: Shield, title: 'Protection', color: 'blue', key: 'protection' },
    { icon: Home, title: 'Indoor', color: 'green', key: 'indoor' },
    { icon: Activity, title: 'Activities', color: 'purple', key: 'activities' },
    { icon: Heart, title: 'Health', color: 'red', key: 'health' }
  ];

  const getColorClass = (color) => {
    return {
      blue: 'bg-blue-500/20 text-blue-500 border-blue-300',
      green: 'bg-green-500/20 text-green-500 border-green-300',
      purple: 'bg-purple-500/20 text-purple-500 border-purple-300',
      red: 'bg-red-500/20 text-red-500 border-red-300'
    }[color];
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'anticipate' }
  };

  return (
    <motion.div {...pageTransition} className="space-y-8">
      <Helmet>
        <title>Health Tips - AirWatch India</title>
        <meta name="description" content="Personalized health safety tips based on current AQI levels." />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Health Tips</h1>
        <p className="text-muted-foreground">Stay safe and healthy with real-time recommendations.</p>
      </div>

      <Card>
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Current AQI</p>
            <p className={`text-3xl font-bold ${aqiInfo.colorClass}`}>{currentAQI}</p>
            <p className={`text-sm font-medium ${aqiInfo.colorClass}`}>{aqiInfo.category}</p>
          </div>
          <div className="text-right">
            <AlertTriangle className={`mb-2 ${aqiInfo.colorClass}`} size={32} />
            <p className="text-sm text-muted-foreground">High Risk</p>
          </div>
        </CardContent>
      </Card>

      {categories.map((cat, index) => {
        const filteredTips = tips.filter(t => t.category === cat.key);
        if (filteredTips.length === 0) return null;

        return (
          <motion.div key={cat.key} {...pageTransition} transition={{ delay: 0.1 * index }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getColorClass(cat.color)}`}>
                    <cat.icon size={20} />
                  </div>
                  <span>{cat.title} Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredTips.map((tip, i) => (
                  <motion.div
                    key={i}
                    className="p-4 bg-secondary rounded-lg border-l-4 border-primary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <h4 className="font-medium mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                    {tip.priority === 'high' && (
                      <span className="inline-block mt-2 px-2 py-1 text-destructive bg-destructive/20 text-xs rounded-full">
                        High Priority
                      </span>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h4 className="text-destructive font-medium mb-2">🚨 Emergency Services</h4>
            <p className="text-sm text-muted-foreground mb-2">Severe symptoms like chest pain or difficulty breathing:</p>
            <p className="text-lg font-bold">📞 108 (Emergency)</p>
          </div>
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <h4 className="text-primary font-medium mb-2">🏥 Pollution Control Board</h4>
            <p className="text-sm text-muted-foreground mb-2">To report local pollution incidents:</p>
            <p className="font-bold">📞 1800-11-0031</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Tips;
