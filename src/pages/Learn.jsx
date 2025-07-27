import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BookOpen, ChevronDown, ChevronRight, Lightbulb, Shield, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Learn = () => {
  const [expandedSection, setExpandedSection] = useState('aqi-basics');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const learningContent = [
    {
      id: 'aqi-basics',
      title: 'Understanding AQI',
      icon: BookOpen,
      color: 'blue',
      content: {
        overview: 'The Air Quality Index (AQI) is a standardized way to communicate air pollution levels to the public.',
        details: [
          'AQI ranges from 0 to 500, with higher values indicating worse air quality',
          'It considers five major pollutants: PM2.5, PM10, O3, NO2, SO2, and CO',
          'Different countries may use slightly different calculation methods',
          'Real-time AQI helps people make informed decisions about outdoor activities'
        ],
        categories: [
          { range: '0-50', level: 'Good', color: 'green', description: 'Air quality is satisfactory' },
          { range: '51-100', level: 'Moderate', color: 'yellow', description: 'Acceptable for most people' },
          { range: '101-150', level: 'Unhealthy for Sensitive Groups', color: 'orange', description: 'Sensitive people may experience symptoms' },
          { range: '151-200', level: 'Unhealthy', color: 'red', description: 'Everyone may experience health effects' },
          { range: '201-300', level: 'Very Unhealthy', color: 'purple', description: 'Health warnings of emergency conditions' },
          { range: '301-500', level: 'Hazardous', color: 'maroon', description: 'Emergency conditions affecting entire population' }
        ]
      }
    },
    {
      id: 'pollutants',
      title: 'Major Pollutants',
      icon: Shield,
      color: 'red',
      content: {
        overview: 'Learn about the main air pollutants that affect human health and the environment.',
        pollutants: [
          {
            name: 'PM2.5',
            fullName: 'Particulate Matter 2.5',
            description: 'Fine particles smaller than 2.5 micrometers that can penetrate deep into lungs',
            sources: 'Vehicle emissions, industrial processes, burning of fossil fuels',
            health: 'Respiratory problems, heart disease, reduced lung function'
          },
          {
            name: 'PM10',
            fullName: 'Particulate Matter 10',
            description: 'Particles smaller than 10 micrometers, including dust and pollen',
            sources: 'Construction activities, road dust, agricultural operations',
            health: 'Coughing, throat irritation, reduced lung function'
          },
          {
            name: 'O3',
            fullName: 'Ground-level Ozone',
            description: 'Secondary pollutant formed by chemical reactions in sunlight',
            sources: 'Vehicle emissions, industrial facilities, chemical solvents',
            health: 'Chest pain, coughing, throat irritation, airway inflammation'
          },
          {
            name: 'NO2',
            fullName: 'Nitrogen Dioxide',
            description: 'Reddish-brown gas with a characteristic sharp, biting odor',
            sources: 'Motor vehicles, power plants, industrial facilities',
            health: 'Respiratory infections, reduced lung function, asthma'
          },
        ]
      }
    },
    {
      id: 'prevention',
      title: 'Prevention & Protection',
      icon: Leaf,
      color: 'green',
      content: {
        overview: 'Practical steps to protect yourself and reduce air pollution in your community.',
        personal: [
          'Use N95 or P100 masks when AQI is above 150',
          'Keep windows closed during high pollution days',
          'Use air purifiers with HEPA filters indoors',
          'Avoid outdoor exercise when AQI is unhealthy',
        ],
        community: [
          'Use public transportation or carpool',
          'Choose electric or hybrid vehicles',
          'Support renewable energy initiatives',
          'Participate in tree planting programs',
        ],
        home: [
          'Regular maintenance of heating/cooling systems',
          'Use eco-friendly cleaning products',
          'Avoid burning wood or trash',
          'Choose low-VOC paints and furniture',
        ]
      }
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500/20 text-blue-400",
      red: "bg-red-500/20 text-red-400",
      green: "bg-green-500/20 text-green-400"
    };
    return colors[color] || colors.blue;
  };

  const getCategoryColor = (color) => {
    const colors = {
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      purple: "bg-purple-600",
      maroon: "bg-red-900"
    };
    return colors[color] || colors.green;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
      className="space-y-8"
    >
      <Helmet>
        <title>Learn - AirWatch India</title>
        <meta name="description" content="Learn about air quality, pollutants, and how to protect yourself from air pollution. Educational resources about AQI and environmental health." />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Learn About Air Quality</h1>
        <p className="text-muted-foreground">Understanding pollution and protecting your health.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="text-yellow-400" size={24} />
            <h2 className="text-foreground font-semibold text-lg">Quick Facts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="text-primary font-medium mb-2">🌍 Global Impact</h3>
              <p className="text-muted-foreground text-sm">
                Air pollution causes 7 million premature deaths worldwide annually.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="text-primary font-medium mb-2">🇮🇳 India Statistics</h3>
              <p className="text-muted-foreground text-sm">
                21 of the world's 30 most polluted cities are in India.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {learningContent.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card>
              <CardHeader>
                <CardTitle
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(section.color)}`}>
                      <section.icon size={20} />
                    </div>
                    <span>{section.title}</span>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </CardTitle>
              </CardHeader>

              {expandedSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content.overview}
                    </p>

                    {section.content.categories && (
                      <div className="space-y-3">
                        <h3 className="text-foreground font-medium">AQI Categories</h3>
                        {section.content.categories.map((category, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                            <div className={`w-4 h-4 rounded-full ${getCategoryColor(category.color)}`}></div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-foreground font-medium">{category.range}</span>
                                <span className="text-muted-foreground">-</span>
                                <span className="text-foreground">{category.level}</span>
                              </div>
                              <p className="text-muted-foreground text-sm">{category.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.content.details && (
                      <div className="space-y-2">
                        <h3 className="text-foreground font-medium">Key Points</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          {section.content.details.map((detail, idx) => (
                            <li key={idx} className="text-muted-foreground text-sm">{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.content.pollutants && (
                      <div className="space-y-3">
                        <h3 className="text-foreground font-medium">Common Pollutants</h3>
                        {section.content.pollutants.map((pollutant, idx) => (
                          <div key={idx} className="p-4 bg-secondary rounded-lg space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-foreground font-semibold">{pollutant.name}</span>
                              <span className="text-muted-foreground">-</span>
                              <span className="text-foreground">{pollutant.fullName}</span>
                            </div>
                            <p className="text-muted-foreground text-sm">{pollutant.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-primary font-medium">Sources: </span>
                                <span className="text-muted-foreground">{pollutant.sources}</span>
                              </div>
                              <div>
                                <span className="text-destructive font-medium">Health Effects: </span>
                                <span className="text-muted-foreground">{pollutant.health}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.content.personal && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-foreground font-medium mb-2">Personal Protection</h3>
                          <ul className="space-y-1 list-disc list-inside">
                            {section.content.personal.map((tip, idx) => (
                              <li key={idx} className="text-muted-foreground text-sm">{tip}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-foreground font-medium mb-2">Community Action</h3>
                          <ul className="space-y-1 list-disc list-inside">
                            {section.content.community.map((action, idx) => (
                              <li key={idx} className="text-muted-foreground text-sm">{action}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-foreground font-medium mb-2">Home Improvements</h3>
                          <ul className="space-y-1 list-disc list-inside">
                            {section.content.home.map((improvement, idx) => (
                              <li key={idx} className="text-muted-foreground text-sm">{improvement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Learn;
