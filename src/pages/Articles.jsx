import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: "How Small Rural Towns Can Combat Air Pollution",
    source: "CPCB Gazette",
    date: "July 5, 2025",
    description: "Discover effective, low-cost strategies for improving air quality in non-urban environments, focusing on community involvement and local resources.",
    image: "https://images.unsplash.com/photo-1602524816929-94df56b7769f"
  },
  {
    title: "Understanding IMD Weather Patterns and Pollution",
    source: "IMD Weather Watch",
    date: "July 2, 2025",
    description: "Learn how meteorological data from the IMD can predict high-pollution days and help communities prepare in advance.",
    image: "https://images.unsplash.com/photo-1612837017391-d2c285a1f02a"
  },
  {
    title: "ISRO's Satellite Data: A New Frontier in Air Quality Monitoring",
    source: "ISRO Insights",
    date: "June 28, 2025",
    description: "An in-depth look at how satellite imagery and atmospheric data are revolutionizing the way we track pollution sources from space.",
    image: "https://images.unsplash.com/photo-1576520061410-cbc1c1d7465c"
  },
  {
    title: "The Top 5 Air-Purifying Plants for Indian Homes",
    source: "Green Living India",
    date: "June 25, 2025",
    description: "Bring the outdoors in! A practical guide to selecting and caring for indoor plants that are proven to filter common household pollutants.",
    image: "https://images.unsplash.com/photo-1616627986191-22fcd7b0b517"
  },
  {
    title: "DIY Air Filters: A Cost-Effective Solution for Cleaner Indoor Air",
    source: "Jugaad Innovations",
    date: "June 20, 2025",
    description: "Can a simple box fan and a furnace filter really improve your health? We investigate the science behind DIY air purifiers.",
    image: "https://images.unsplash.com/photo-1600794173095-e9f60f4d1e4e"
  },
  {
    title: "Crop Burning in Punjab: Tracing the Source of North India's Haze",
    source: "Rural & Urban Monitor",
    date: "June 18, 2025",
    description: "Using CPCB and satellite data, we map the primary sources of seasonal smog and discuss potential solutions for farmers.",
    image: "https://images.unsplash.com/photo-1583098149854-8590a766fa1e"
  }
];

const Articles = () => {
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
        <title>Articles - AirWatch India</title>
        <meta name="description" content="Read the latest articles and research on air quality, pollution, and health from sources like CPCB, IMD, and ISRO." />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Articles & News</h1>
        <p className="text-muted-foreground">Stay informed with the latest research and stories on air quality.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  className="w-full h-full object-cover"
                  alt={article.title}
                  src={article.image}
                />
              </div>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>
                  {article.source} - {article.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{article.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Articles;
