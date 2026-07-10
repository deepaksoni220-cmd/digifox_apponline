'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Briefcase, TrendingUp, DollarSign, Activity, Settings } from 'lucide-react';
import { WebsitePreview } from '@/components/ui/website-preview';

const stats = [
  { name: 'Total Revenue', value: '₹14,50,000', icon: DollarSign, change: '+12.5%', trend: 'up' },
  { name: 'Active Services', value: '8', icon: Briefcase, change: '+2', trend: 'up' },
  { name: 'Total Clients', value: '24', icon: Users, change: '+4', trend: 'up' },
  { name: 'Live Projects', value: '12', icon: Activity, change: '+1', trend: 'up' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Command Center</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          High-level overview of agency operations and revenue.
        </p>
      </div>

      {/* Website Preview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Our Main Hub</h2>
            <p className="text-sm text-gray-500">Live preview of digifox.world</p>
          </div>
        </div>
        <WebsitePreview />
      </motion.div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.1 }}
            >
              <Card className="border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      stat.trend === 'up' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-indigo-500' : 'text-red-500 rotate-180'}`} />
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-indigo-600 dark:text-indigo-400' : 'text-red-600 dark:text-red-400'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue across all services</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center text-gray-500 border-2 border-dashed border-gray-200/50 dark:border-gray-800/50 rounded-xl mx-6 mb-6">
            Chart visualization will be here
          </CardContent>
        </Card>
        <Card className="col-span-3 border-gray-200/50 bg-white/40 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the agency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { time: '2 hours ago', text: 'New project "Apex Finance" onboarded.' },
                { time: '5 hours ago', text: 'Invoice #INV-240 paid by Lumina Corp.' },
                { time: '1 day ago', text: 'Employee Alex uploaded new portfolio item.' },
                { time: '1 day ago', text: 'Client request received for SEO audit.' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{act.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
