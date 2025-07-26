import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  TrendingUp,
  MapPin,
  Newspaper,
  User,
} from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/forecast', label: 'Forecast', icon: TrendingUp },
    { path: '/map', label: 'Map', icon: MapPin },
    { path: '/articles', label: 'Articles', icon: Newspaper },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t shadow-md lg:hidden">
      <div className="flex justify-between items-center h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center justify-center flex-1 group relative"
            >
              <motion.div
                className={`transition-all ${
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} />
              </motion.div>
              <span className={`text-[10px] mt-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              }`}>
