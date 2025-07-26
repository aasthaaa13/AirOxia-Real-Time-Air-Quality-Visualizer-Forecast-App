// App.js – Main App structure and route configuration
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import { Toaster } from './components/ui/toaster';

import Home from './pages/Home';
import Forecast from './pages/Forecast';
import Tips from './pages/Tips';
import Map from './pages/Map';
import Alerts from './pages/Alerts';
import Learn from './pages/Learn';
import Articles from './pages/Articles';
import Profile from './pages/Profile';

// AppContent handles layout and animated route transitions
function AppContent() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Helmet>
        <title>AirOxia – Real-time AQI & Forecast</title>
        <meta
          name="description"
          content="AirOxia provides live air quality data, rural-specific AQI forecasts, health alerts, and pollution maps using ISRO and CPCB datasets."
        />
      </Helmet>

      <Sidebar />

      <main className="flex-1 lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/map" element={<Map />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>

      <MobileNav />
      <Toaster />
    </div>
  );
}

// Main App wrapped with Router
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
