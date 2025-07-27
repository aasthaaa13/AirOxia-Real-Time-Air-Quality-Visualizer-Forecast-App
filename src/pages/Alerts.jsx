import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Bell, BellOff, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Alerts = () => {
  const [notifications, setNotifications] = useState({
    enabled: true,
    aqiThreshold: 150,
    dailyReport: true,
    emergencyAlerts: true,
    locationBased: true
  });

  const [recentAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High AQI Alert',
      message: 'Air quality in Delhi has reached unhealthy levels (AQI: 201)',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Daily Report',
      message: 'Your daily air quality summary is ready',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'emergency',
      title: 'Emergency Alert',
      message: 'Severe pollution detected. Avoid outdoor activities.',
      time: '2 days ago',
      read: true
    }
  ]);

  const toggleNotifications = (checked) => {
    setNotifications(prev => ({
      ...prev,
      enabled: checked
    }));

    toast({
      title: checked ? "Notifications Enabled" : "Notifications Disabled",
      description: checked
        ? "You'll now receive air quality alerts"
        : "You won't receive air quality alerts",
    });
  };

  const updateSetting = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));

    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'emergency':
        return <AlertTriangle className="text-red-400" size={20} />;
      case 'info':
        return <CheckCircle className="text-blue-400" size={20} />;
      default:
        return <Bell className="text-muted-foreground" size={20} />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'emergency':
        return 'border-red-500/50 bg-red-500/10';
      case 'info':
        return 'border-blue-500/50 bg-blue-500/10';
      default:
        return 'border-border bg-secondary';
    }
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
        <title>Alerts - AirWatch India</title>
        <meta
          name="description"
          content="Manage air quality alerts and notifications. Get notified when pollution levels are dangerous for your health."
        />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
        <p className="text-muted-foreground">Stay informed about air quality changes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              {notifications.enabled ? <Bell size={20} /> : <BellOff size={20} />}
              <span>Notification Settings</span>
            </span>
            <Switch
              checked={notifications.enabled}
              onCheckedChange={toggleNotifications}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <h4 className="text-white font-medium">AQI Threshold Alerts</h4>
                <p className="text-slate-400 text-sm">Get notified when AQI exceeds your threshold</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={notifications.aqiThreshold}
                  onChange={(e) =>
                    updateSetting('aqiThreshold', parseInt(e.target.value))
                  }
                  className="w-20 px-2 py-1 bg-slate-700 border-slate-600 rounded text-white text-sm"
                  min="0"
                  max="500"
                />
                <span className="text-slate-400 text-sm">AQI</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <Label htmlFor="daily-reports">Daily Reports</Label>
              <Switch
                id="daily-reports"
                checked={notifications.dailyReport}
                onCheckedChange={(checked) => updateSetting('dailyReport', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
              <Switch
                id="emergency-alerts"
                checked={notifications.emergencyAlerts}
                onCheckedChange={(checked) => updateSetting('emergencyAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <Label htmlFor="location-alerts">Location-Based Alerts</Label>
              <Switch
                id="location-alerts"
                checked={notifications.locationBased}
                onCheckedChange={(checked) => updateSetting('locationBased', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                !alert.read ? 'border-l-4 border-l-primary' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{alert.title}</h4>
                    <span className="text-muted-foreground text-xs">{alert.time}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{alert.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Settings className="text-primary mx-auto" size={32} />
            <div>
              <h3 className="font-medium text-foreground mb-2">Push Notifications</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Enable browser notifications to receive real-time air quality alerts even when the app is closed.
              </p>
              <Button
                onClick={() => {
                  toast({
                    title: "🚧 Feature Coming Soon",
                    description: "Push notifications will be available in the next update! 🚀",
                  });
                }}
              >
                Enable Push Notifications
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Alerts;
