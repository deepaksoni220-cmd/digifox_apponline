'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { ExternalLink, ArrowRight, Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '@/app/actions/portfolio';

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  link: string;
  description: string;
};

export default function AdminPortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '3D Animated Website', link: '', description: '' });

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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    // Optimistic UI update
    setItems(prev => prev.filter(item => item.id !== id));
    
    const { error } = await deletePortfolioItem(id);
    if (error) {
      alert(`Failed to delete: ${error}`);
      // Refresh to restore original state
      const data = await getPortfolioItems();
      setItems(data);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.link) return;
    setIsSaving(true);

    if (editingItem) {
      const { data, error } = await updatePortfolioItem(editingItem.id, formData);
      if (error) {
        alert(`Failed to update: ${error}`);
      } else if (data) {
        setItems(prev => prev.map(item => item.id === editingItem.id ? data : item));
        setShowForm(false);
        setEditingItem(null);
      }
    } else {
      const { data, error } = await addPortfolioItem(formData);
      if (error) {
        alert(`Failed to add: ${error}`);
      } else if (data) {
        setItems(prev => [data, ...prev]);
        setShowForm(false);
        setEditingItem(null);
      }
    }
    setIsSaving(false);
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
            onClick={() => !isSaving && setShowForm(false)}
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
                <button 
                  onClick={() => setShowForm(false)} 
                  disabled={isSaving}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50"
                >
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
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Website URL</label>
                  <Input 
                    value={formData.link}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://example.com"
                    className="rounded-xl"
                    disabled={isSaving}
                  />
                  {formData.link && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <img 
                        src={`https://image.thum.io/get/width/600/crop/400/${formData.link}`} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    disabled={isSaving}
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
                    disabled={isSaving}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <Button 
                  onClick={handleSave} 
                  className="w-full mt-2 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20" 
                  disabled={!formData.title || !formData.link || isSaving}
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Project'}
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
