'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { getPortfolioItems } from '@/app/actions/portfolio';

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  link: string;
  description: string;
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      setIsLoading(true);
      const data = await getPortfolioItems();
      setItems(data);
      setIsLoading(false);
    }
    loadItems();
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[calc(100dvh-64px)]">
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
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No projects found in this category.
        </div>
      ) : (
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const imageUrl = `https://image.thum.io/get/width/800/crop/600/${item.link}`;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200/50 shadow-sm dark:bg-gray-900 dark:border-gray-800/50 flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    {item.link && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/90 text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-lg"
                        >
                          Visit Website <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {item.category}
                      </span>
                      {item.link && <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                      {item.description}
                    </p>
                    
                    {item.link && (
                      <a 
                        href={item.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-auto w-fit group/btn"
                      >
                        View Live Site 
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
