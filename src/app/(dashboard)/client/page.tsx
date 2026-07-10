'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, MessageSquare, Rocket, Sparkles } from 'lucide-react';
import { WebsitePreview } from '@/components/ui/website-preview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here is your agency overview and project status.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/client/support">
            <Button variant="secondary" className="rounded-xl">
              <MessageSquare className="w-4 h-4 mr-2" /> Contact Support
            </Button>
          </Link>
          <Link href="/client/support">
            <Button className="rounded-xl shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 mr-2" /> New Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Active Projects</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
            <p className="text-sm text-gray-500 mt-2">Currently in development phase</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Total Spent</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">₹45,000</p>
            <p className="text-sm text-gray-500 mt-2">Across 2 completed invoices</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-white/20 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white">Next Milestone</h3>
            </div>
            <p className="text-xl font-bold text-white mb-1">Design Approval</p>
            <p className="text-sm text-white/80">Expected by Thursday, 24th</p>
          </CardContent>
        </Card>
      </div>

      {/* Website Preview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Explore Digifox.world</h2>
            <p className="text-sm text-gray-500">Discover more services and our latest portfolio</p>
          </div>
        </div>
        <WebsitePreview />
      </motion.div>
    </div>
  );
}
