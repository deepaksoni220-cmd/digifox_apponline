'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building2, Globe, Briefcase, Camera, Save, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Akash Sarma',
    email: 'sarah@aurastudio.com',
    phone: '+1 (555) 019-8234',
    company: 'Aura Studio LLC',
    website: 'https://aurastudio.com',
    role: 'Marketing Director'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  const inputClasses = "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pl-11 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-400 dark:focus:bg-gray-950 transition-all";
  const labelClasses = "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your personal information and company details.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* Profile Card Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 h-fit"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1">
                <div className="h-full w-full rounded-full border-4 border-white bg-gray-100 dark:border-gray-950 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
                  <User className="h-12 w-12 text-gray-400" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{formData.name}</h2>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">{formData.role}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formData.company}</p>
            
            <div className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20">
              <Shield className="h-4 w-4" />
              Verified Client
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Personal Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Personal Details</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative">
                  <label className={labelClasses}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={inputClasses} 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className={labelClasses}>Role / Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className={inputClasses} 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className={labelClasses}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={inputClasses} 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className={labelClasses}>Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={inputClasses} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details Section */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Company Details</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative">
                  <label className={labelClasses}>Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className={inputClasses} 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className={labelClasses}>Company Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="url" 
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className={inputClasses} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <Button 
                type="submit" 
                disabled={isSaving || isSaved}
                className={`h-12 px-8 text-base font-medium rounded-xl transition-all ${
                  isSaved ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> 
                    Saving Changes...
                  </span>
                ) : isSaved ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 
                    Changes Saved!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> 
                    Save Changes
                  </span>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
