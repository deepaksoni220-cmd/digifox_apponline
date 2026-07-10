'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, FileText, Send, HelpCircle, Briefcase, Paperclip, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientSupportPage() {
  const [supportState, setSupportState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [reqState, setReqState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportState('loading');
    setTimeout(() => {
      setSupportState('success');
      setTimeout(() => setSupportState('idle'), 3000);
    }, 1500);
  };

  const handleReqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReqState('loading');
    setTimeout(() => {
      setReqState('success');
      setTimeout(() => setReqState('idle'), 3000);
    }, 1500);
  };

  const inputClasses = "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-400 dark:focus:bg-gray-950 transition-all";
  const labelClasses = "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center items-center gap-3">
          <HelpCircle className="w-8 h-8 text-indigo-500" />
          Support & Requirements
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Need assistance or ready to start something new? Get in touch with our team directly, or submit your detailed requirements for an upcoming project.
        </p>
        <div className="mt-8">
          <a href="https://wa.me/918696755996" target="_blank" rel="noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-md shadow-green-500/20 h-12 px-6">
              <MessageSquare className="w-5 h-5 mr-2" /> Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Support Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950 relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact Support</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open a ticket for help or questions.</p>
            </div>
          </div>

          <form onSubmit={handleSupportSubmit} className="space-y-5 relative z-10">
            <div>
              <label className={labelClasses}>Subject / Issue</label>
              <input required type="text" placeholder="E.g. Cannot access billing portal" className={inputClasses} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Category</label>
                <select className={inputClasses}>
                  <option>Technical Issue</option>
                  <option>Billing Question</option>
                  <option>General Inquiry</option>
                  <option>Account Management</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Priority</label>
                <select className={inputClasses}>
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Detailed Message</label>
              <textarea required rows={4} placeholder="Please describe how we can help you..." className={`${inputClasses} resize-none`}></textarea>
            </div>

            <Button 
              type="submit"
              disabled={supportState !== 'idle'} 
              className={`w-full h-12 text-base font-medium rounded-xl transition-all ${
                supportState === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {supportState === 'loading' ? (
                <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</span>
              ) : supportState === 'success' ? (
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Support Ticket Created!</span>
              ) : (
                <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Project Requirements Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950 relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Project Requirements</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Submit specs for a new project.</p>
            </div>
          </div>

          <form onSubmit={handleReqSubmit} className="space-y-5 relative z-10">
            <div>
              <label className={labelClasses}>Project Name / Title</label>
              <input required type="text" placeholder="E.g. Q4 E-Commerce Redesign" className={inputClasses} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Project Type</label>
                <select className={inputClasses}>
                  <option>Website Design</option>
                  <option>Web Application</option>
                  <option>Branding & Identity</option>
                  <option>Marketing Campaign</option>
                  <option>SEO Optimization</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Start By</label>
                <select className={inputClasses} required>
                  <option value="">Select urgency...</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 7 days">Within 7 days</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Detailed Requirements</label>
              <textarea required rows={4} placeholder="List out your core objectives, features required, target audience, and any reference materials..." className={`${inputClasses} resize-none`}></textarea>
            </div>

            <Button 
              type="submit"
              disabled={reqState !== 'idle'} 
              className={`w-full h-12 text-base font-medium rounded-xl transition-all ${
                reqState === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {reqState === 'loading' ? (
                <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Submitting...</span>
              ) : reqState === 'success' ? (
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Requirements Sent!</span>
              ) : (
                <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Submit Requirements</span>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
