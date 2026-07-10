'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { ExternalLink, Edit2, Trash2, Plus, X, Save, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Realistic data based on Digifox.world's capabilities
const initialPortfolioItems = [
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

export default function AdminPortfolioPage() {
  const [items, setItems] = useState(initialPortfolioItems);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem({
      id: Date.now(),
      title: '',
      category: PORTFOLIO_CATEGORIES[0],
      image: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      if (items.find(i => i.id === editingItem.id)) {
        // Update existing
        setItems(items.map(i => i.id === editingItem.id ? editingItem : i));
      } else {
        // Add new
        setItems([editingItem, ...items]);
      }
      setIsSaving(false);
      setIsModalOpen(false);
      setEditingItem(null);
    }, 800);
  };

  const inputClasses = "w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-400 dark:focus:bg-gray-950 transition-all";
  const labelClasses = "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[calc(100dvh-64px)] relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Portfolio</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Add, edit, or remove showcase items from your public portfolio.</p>
        </div>
        <Button onClick={handleAdd} className="rounded-xl px-6 h-12 shadow-md shadow-indigo-600/20" icon={<Plus className="w-5 h-5" />}>
          Add New Item
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'All' 
            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          All Items
        </button>
        {PORTFOLIO_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' 
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
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200/50 shadow-sm dark:bg-gray-900 dark:border-gray-800/50 flex flex-col"
            >
              {/* Admin Quick Actions Overlay */}
              <div className="absolute top-4 right-4 z-10 flex gap-2 transition-all duration-300">
                <button 
                  onClick={() => handleEdit(item)}
                  className="h-10 w-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors dark:bg-gray-900/90 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white border border-indigo-100 dark:border-indigo-900/50"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="h-10 w-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-colors dark:bg-gray-900/90 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white border border-red-100 dark:border-red-900/50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                {/* Dark gradient overlay at top for buttons */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingItem.title ? 'Edit Portfolio Item' : 'Add New Item'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className={labelClasses}>Project Title</label>
                  <input 
                    required 
                    type="text" 
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    placeholder="E.g. Aura 3D E-Commerce" 
                    className={inputClasses} 
                  />
                </div>
                
                <div>
                  <label className={labelClasses}>Category</label>
                  <select 
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className={inputClasses}
                  >
                    {PORTFOLIO_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Image URL</label>
                  <input 
                    required 
                    type="url" 
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                    placeholder="https://images.unsplash.com/..." 
                    className={inputClasses} 
                  />
                  {editingItem.image && (
                    <div className="mt-3 aspect-[4/3] w-full max-w-[200px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                      <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClasses}>Description</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Describe the project and results..." 
                    className={`${inputClasses} resize-none`}
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="rounded-xl px-8 shadow-md"
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save Portfolio Item</span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
