'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Briefcase, Send, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [supportState, setSupportState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [reqState, setReqState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSupportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSupportState('loading');

    const formData = new FormData(e.currentTarget);
    const userName = formData.get('userName');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const text = `*New General Inquiry*\n\n*Name:* ${userName}\n*Email:* ${email}\n*Message:*\n${message}`;
    window.open(`https://wa.me/918696755996?text=${encodeURIComponent(text)}`, '_blank');

    setTimeout(() => {
      setSupportState('success');
      setTimeout(() => setSupportState('idle'), 3000);
    }, 1000);
  };

  const handleReqSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReqState('loading');

    const formData = new FormData(e.currentTarget);
    const projectName = formData.get('projectName');
    const projectType = formData.get('projectType');
    const startBy = formData.get('startBy');
    const requirements = formData.get('requirements');
    
    const text = `*New Project Requirements*\n\n*Project Name:* ${projectName}\n*Type:* ${projectType}\n*Start By:* ${startBy}\n*Requirements:*\n${requirements}`;
    window.open(`https://wa.me/918696755996?text=${encodeURIComponent(text)}`, '_blank');

    setTimeout(() => {
      setReqState('success');
      setTimeout(() => setReqState('idle'), 3000);
    }, 1000);
  };

  const inputClasses = "w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-400 dark:focus:bg-gray-950 transition-all backdrop-blur-sm";
  const labelClasses = "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Connect</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-400"
        >
          Reach out for general inquiries or submit your project requirements to get a proposal.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex justify-center"
        >
          <a href="https://wa.me/918696755996" target="_blank" rel="noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-md shadow-green-500/20 h-12 px-6 text-base">
              <MessageSquare className="w-5 h-5 mr-2" /> Chat on WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* General Inquiry Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-gray-200 bg-white/40 p-6 sm:p-8 shadow-xl shadow-gray-200/50 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40 dark:shadow-none relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">General Inquiry</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Have a question? Send us a message.</p>
            </div>
          </div>

          <form onSubmit={handleSupportSubmit} className="space-y-5 relative z-10">
            <div>
              <label className={labelClasses}>Your Name</label>
              <input name="userName" required type="text" placeholder="John Doe" className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Email Address</label>
              <input name="email" required type="email" placeholder="john@example.com" className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Message</label>
              <textarea name="message" required rows={4} placeholder="How can we help you?" className={`${inputClasses} resize-none`}></textarea>
            </div>

            <Button 
              type="submit"
              disabled={supportState !== 'idle'} 
              className={`w-full h-12 text-base font-medium rounded-xl transition-all shadow-md ${
                supportState === 'success' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20 text-white' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 text-white'
              }`}
            >
              {supportState === 'loading' ? (
                <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</span>
              ) : supportState === 'success' ? (
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Message Sent!</span>
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
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-gray-200 bg-white/40 p-6 sm:p-8 shadow-xl shadow-gray-200/50 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40 dark:shadow-none relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Project Requirements</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ready to start? Send us your specs.</p>
            </div>
          </div>

          <form onSubmit={handleReqSubmit} className="space-y-5 relative z-10">
            <div>
              <label className={labelClasses}>Project Name / Title</label>
              <input name="projectName" required type="text" placeholder="E.g. E-Commerce Redesign" className={inputClasses} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Project Type</label>
                <select name="projectType" className={inputClasses}>
                  <option>Website Design</option>
                  <option>Web Application</option>
                  <option>Branding & Identity</option>
                  <option>Marketing Campaign</option>
                  <option>SEO Optimization</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Start By</label>
                <select name="startBy" className={inputClasses} required>
                  <option value="">Select urgency...</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 7 days">Within 7 days</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Detailed Requirements</label>
              <textarea name="requirements" required rows={4} placeholder="List out your objectives, features required, target audience, and any reference materials..." className={`${inputClasses} resize-none`}></textarea>
            </div>

            <Button 
              type="submit"
              disabled={reqState !== 'idle'} 
              className={`w-full h-12 text-base font-medium rounded-xl transition-all shadow-md ${
                reqState === 'success' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20 text-white' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20 text-white'
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
