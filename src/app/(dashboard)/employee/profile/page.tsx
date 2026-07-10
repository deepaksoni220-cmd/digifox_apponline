'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Camera, Save, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EmployeeProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex@digifox.world',
    phone: '+1 (555) 123-4567',
    role: 'Senior Developer'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, you would show a success toast here
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your personal information, contact details, and account security.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Card & Avatar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 space-y-6"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-indigo-500 to-purple-600" />
            
            <div className="relative mx-auto mt-6 h-24 w-24 rounded-full border-4 border-white bg-gray-100 shadow-md dark:border-gray-950 dark:bg-gray-800">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-3xl font-bold text-indigo-700 dark:from-indigo-900/50 dark:to-purple-900/50 dark:text-indigo-300">
                {profile.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-transform hover:scale-105">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{profile.name}</h3>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{profile.role}</p>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
              <Shield className="h-4 w-4 text-green-500" />
              Account secured & verified
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-2"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
              Personal Information
            </h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      className="pl-10 h-12 rounded-xl"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      type="tel"
                      className="pl-10 h-12 rounded-xl"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      type="email"
                      className="pl-10 h-12 rounded-xl"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button 
                  type="submit" 
                  className="rounded-xl px-8 h-12 shadow-sm"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving Changes...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" /> Save Changes
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
