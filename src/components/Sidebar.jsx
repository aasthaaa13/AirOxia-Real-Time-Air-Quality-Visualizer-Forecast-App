// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  TrendingUp,
  Heart,
  MapPin,
  Bell,
  BookOpen,
  Wind,
  Newspaper,
  User,
  LogOut
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { toast } from './ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Navigation sidebar for desktop layout
const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const navLinks = [
    { label: 'Dashboard', path: '/', icon: Home },
    { label: 'Forecast', path: '/forecast', icon: TrendingUp },
    { label: 'Pollution Map', path: '/map', icon: MapPin },
    { label: 'Articles', path: '/articles', icon: Newspaper },
    { label: 'Health Tips', path: '/tips', icon: Heart },
    { label: 'Alerts', path: '/alerts', icon: Bell },
    { label: 'Learn', path: '/learn', icon: BookOpen }
  ];

  const handleLogout = () => {
    toast({
      title: "🚧 Coming Soon",
      description: "Logout functionality is under development.",
    });
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-full bg-card border-r fixed shadow-md">
      {/* Logo & Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <Wind className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold text-foreground">AirWatch</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-5 text-center">
        <Link to="/profile">
          <Avatar className="w-20 h-20 mx-auto border-4 border-primary/30 hover:border-primary/70 transition">
            <AvatarImage
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/646d655f-9721-4f93-9e45-48d684074f32/woman-with-a-flower-in-her-hair.png"
              alt="User Avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Link>
        <h2 className="mt-3 text-lg font-medium text-foreground">Ananya Sharma</h2>
        <p className="text-sm text-muted-foreground">Rural Explorer</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1 mt-3 overflow-y-auto">
        {navLinks.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={path}>
              <motion.div
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all text-sm ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-secondary hover:text-foreground text-muted-foreground'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer: Theme + Logout */}
      <div className="px-4 py-5 border-t space-y-3">
        <Link to="/profile">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <User size={18} />
            Profile
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>
        <div className="flex items-center justify-between pt-3">
          <p className="text-sm text-muted-foreground">Theme</p>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
