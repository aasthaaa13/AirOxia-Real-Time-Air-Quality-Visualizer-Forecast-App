import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const popularCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const LocationSearch = ({ onLocationSelect, currentLocation }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const matches = popularCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setResults(matches);
      setLoading(false);
    }, 400);
  };

  const selectCity = (city) => {
    onLocationSelect(city);
    setQuery('');
    setResults([]);
    toast({
      title: 'Location Updated',
      description: `Now showing data for ${city}`,
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      return toast({
        title: 'Not Supported',
        description: 'Your browser does not support location access.',
        variant: 'destructive',
      });
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        onLocationSelect('Current Location');
        toast({
          title: 'Location Detected',
          description: 'Using your current location.',
        });
      },
      () => {
        toast({
          title: 'Permission Denied',
          description: 'Unable to access location. Try manual search.',
          variant: 'destructive',
        });
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Search Field */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          value={query}
          placeholder="Search city..."
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 bg-secondary"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" size={20} />
        )}

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 z-10 mt-2"
          >
            <Card className="bg-popover border-border max-h-60 overflow-y-auto">
              {results.map((city, index) => (
                <motion.button
                  key={city}
                  onClick={() => selectCity(city)}
                  className="w-full px-4 py-2 text-left hover:bg-accent border-b last:border-0"
                  whileHover={{ backgroundColor: 'hsl(var(--accent))' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>{city}</span>
                  </div>
                </motion.button>
              ))}
            </Card>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button variant="outline" onClick={detectLocation} className="w-full">
          <MapPin className="mr-2" size={16} />
          Use Current Location
        </Button>
        <Button
          className="w-full"
          onClick={() =>
            toast({
              title: 'Coming Soon',
              description: 'Pollution source mapping feature is under development.',
            })
          }
        >
          <MapPin className="mr-2" size={16} />
          Source Mapping
        </Button>
      </div>

      {/* Popular Cities */}
      {!query && (
        <div>
          <h3 className="text-sm text-muted-foreground font-medium mb-2">Popular Cities</h3>
          <div className="flex flex-wrap gap-2">
            {popularCities.slice(0, 6).map((city) => (
              <motion.button
                key={city}
                onClick={() => selectCity(city)}
                className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {city}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
