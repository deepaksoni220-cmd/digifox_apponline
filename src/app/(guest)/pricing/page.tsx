'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  const plans = [
    {
      name: 'Website Development',
      price: 'Starting at $500',
      description: 'Premium websites built for conversions, speed, and brand authority.',
      features: [
        'WordPress Website',
        'Shopify Store',
        'Custom Full Stack Web App',
        '3D Animated Website with Backend',
        'Responsive Mobile-First Design',
        'Performance Optimization'
      ],
      popular: true,
      buttonText: 'Start a Project'
    },
    {
      name: 'Paid Advertising',
      price: 'Starting at $500',
      description: 'Data-driven paid campaigns designed to maximize your ROI and scale your business.',
      features: [
        'Meta Ads (Facebook & Instagram)',
        'Google Ads',
        'Campaign Strategy & Setup',
        'Ad Creative & Copywriting',
        'A/B Testing & Optimization',
        'Detailed Analytics Reporting'
      ],
      popular: false,
      buttonText: 'Launch Campaign'
    },
    {
      name: 'Organic Search (SEO/GEO)',
      price: '$200',
      description: 'Long-term organic growth strategies to dominate search engines and AI platforms.',
      features: [
        'Organic Google Ranking (SEO)',
        'Generative Engine Optimization (GEO)',
        'Keyword Research & Strategy',
        'On-Page & Technical SEO',
        'Content Optimization',
        'Monthly Performance Reports'
      ],
      popular: false,
      buttonText: 'Boost Rankings'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 min-h-[calc(100dvh-64px)]">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Pricing</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-400"
        >
          Simple, upfront pricing for premium digital services. No hidden fees.
        </motion.p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex flex-col rounded-3xl p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm ${
              plan.popular ? 'border-2 border-indigo-500 dark:border-indigo-400 shadow-xl scale-105 z-10' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-center text-xs font-semibold text-white shadow-sm">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
              </div>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full py-6 rounded-xl font-bold text-md ${
                plan.popular
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
              }`}
            >
              {plan.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
