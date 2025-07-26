import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  TrendingUp, 
  Heart, 
  MapPin, 
  Bell, 
  BookOpen 
} from 'lucide-react';

// Mobile Bottom Navigation Bar
const Navigation = () => {
  const location = useLocation();

  // Define navigation tabs
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/forecast', icon: TrendingUp, label: 'Forecast' },
    { path: '/tips', icon: Heart, label: 'Tips' },
    { path: '/map', icon: MapPin, label: 'Map' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 border-t backdrop-blur-sm">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className="relative flex flex-col items-center justify-center"
            >
              <motion.div
                className={`transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} />
              </motion.div>
              <span
                className={`text-[10px] mt-1 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="navActiveDot"
                  className="absolute bottom-0 w-6 h-0.5 bg-primary rounded-full"
                  initial={false}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
