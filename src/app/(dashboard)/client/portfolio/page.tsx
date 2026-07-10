'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { ExternalLink, ArrowRight } from 'lucide-react';

// Realistic data based on Digifox.world's capabilities
const portfolioItems = [
  {
    id: 1,
    title: 'Aura 3D E-Commerce',
    category: '3D Animated Website',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop',
    description: 'A fully interactive 3D WebGL experience built for a premium tech brand.',
  },
  {
    id: 2,
    title: 'Lumina Fashion',
    category: 'Shopify Store',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    description: 'High-converting Shopify store with custom animations and 200% ROI on Meta Ads.',
  },
  {
    id: 3,
    title: 'Apex Financial',
    category: 'WordPress Website',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    description: 'High-performance WordPress enterprise platform with custom dashboard.',
  },
  {
    id: 4,
    title: 'Organic Growth Co.',
    category: 'Google Ranking',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop',
    description: 'Achieved 450% increase in Google organic traffic within 6 months.',
  },
  {
    id: 5,
    title: 'Nexus Campaign',
    category: 'Ad Creative',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    description: 'Scroll-stopping ad creatives that generated a 3x ROAS.',
  },
  {
    id: 6,
    title: 'Verve Branding',
    category: 'Shopify Store',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    description: 'Complete brand identity and Shopify setup.',
  }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 min-h-[calc(100dvh-64px)]">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Portfolio</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-400"
        >
          Explore how Digifox transforms brands with stunning 3D websites, Shopify stores, and performance marketing.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'All' 
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {PORTFOLIO_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Portfolio Grid */}
      <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200/50 shadow-sm dark:bg-gray-900 dark:border-gray-800/50"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
