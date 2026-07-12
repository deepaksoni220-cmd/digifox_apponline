'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { ExternalLink, ArrowRight, Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  link: string;
  description: string;
};

const defaultItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Aura 3D E-Commerce',
    category: '3D Animated Website',
    link: 'https://apple.com',
    description: 'A fully interactive 3D WebGL experience built for a premium tech brand.',
  },
  {
    id: 2,
    title: 'Lumina Fashion',
    category: 'Shopify Store',
    link: 'https://gymshark.com',
    description: 'High-converting Shopify store with custom animations and 200% ROI on Meta Ads.',
  },
  {
    id: 3,
    title: 'Apex Financial',
    category: 'WordPress Website',
    link: 'https://stripe.com',
    description: 'High-performance WordPress enterprise platform with custom dashboard.',
  },
  {
    id: 4,
    title: 'Organic Growth Co.',
    category: 'Google Ranking',
    link: 'https://vercel.com',
    description: 'Achieved 450% increase in Google organic traffic within 6 months.',
  },
  {
    id: 5,
    title: 'Nexus Campaign',
    category: 'Ad Creative',
    link: 'https://dribbble.com',
    description: 'Scroll-stopping ad creatives that generated a 3x ROAS.',
  },
  {
    id: 6,
    title: 'Verve Branding',
    category: 'Shopify Store',
    link: 'https://allbirds.com',
    description: 'Complete brand identity and Shopify setup.',
  }
];

export default function AdminPortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [items, setItems] = useState<PortfolioItem[]>(defaultItems);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '3D Animated Website', link: '', description: '' });

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', category: '3D Animated Website', link: '', description: '' });
    setShowForm(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({ title: item.title, category: item.category, link: item.link, description: item.description });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (!formData.title || !formData.link) return;

    if (editingItem) {
      setItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData } 
          : item
      ));
    } else {
      const newId = Math.max(...items.map(i => i.id), 0) + 1;
      setItems(prev => [...prev, { id: newId, ...formData }]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100dvh-64px)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Portfolio</span>
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Add, edit, or remove portfolio projects.</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 shadow-md shadow-indigo-600/20">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 w-full max-w-lg border border-gray-200/50 dark:border-gray-800/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingItem ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Project Title</label>
                  <Input 
                    value={formData.title}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="My Awesome Project"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Website URL</label>
                  <Input 
                    value={formData.link}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://example.com"
                    className="rounded-xl"
                  />
                  {formData.link && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 aspect-video">
                      <img 
                        src={`https://image.thum.io/get/width/600/crop/400/${formData.link}`} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {PORTFOLIO_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the project..."
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <Button onClick={handleSave} className="w-full mt-2 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20" disabled={!formData.title || !formData.link}>
                  <Save className="w-4 h-4" /> {editingItem ? 'Save Changes' : 'Add Project'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
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
                {/* Admin action buttons */}
                <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
    </div>
  );
}
