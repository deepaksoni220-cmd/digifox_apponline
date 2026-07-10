'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, Calendar, CheckSquare } from 'lucide-react';
import { WebsitePreview } from '@/components/ui/website-preview';

export default function EmployeeDashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Workspace</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's on your desk today.
          </p>
        </div>
        <div className="hidden sm:flex text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-900/50 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              <p className="text-sm text-gray-500">Active Tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
              <p className="text-sm text-gray-500">Due This Week</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-sm text-gray-500">Completed This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Digifox Network</h2>
              <p className="text-sm text-gray-500">Live preview of our public site</p>
            </div>
          </div>
          <WebsitePreview />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Current Priorities</h2>
              <p className="text-sm text-gray-500">Your assigned tasks</p>
            </div>
          </div>
          <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40 h-[300px] overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
                {[
                  { title: 'Update Aura 3D Homepage', project: 'Aura 3D E-Commerce', status: 'In Progress', color: 'blue' },
                  { title: 'Setup Shopify Theme', project: 'Lumina Fashion', status: 'Pending', color: 'orange' },
                  { title: 'Optimize Hero Images', project: 'Apex Financial', status: 'In Progress', color: 'blue' },
                  { title: 'Client Onboarding Call', project: 'Internal', status: 'Done', color: 'green' },
                ].map((task, i) => (
                  <div key={i} className="p-4 hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors flex items-center gap-4">
                    <div className="mt-1">
                      {task.status === 'Done' ? (
                        <CheckSquare className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className={`w-5 h-5 rounded border-2 border-${task.color}-400 dark:border-${task.color}-500/50`} />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${task.status === 'Done' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{task.project}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
