'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import * as Icons from 'lucide-react';

export default function StudioPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Studio</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          Digifox is a full-service digital agency. We build stunning 3D websites, high-converting Shopify stores, and power your growth with advanced SEO and Performance Marketing.
        </motion.p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          // @ts-ignore
          const Icon = Icons[service.icon] || Icons.Code;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/20 dark:bg-gray-900/50 dark:border-gray-800 dark:shadow-none hover:-translate-y-1 transition-transform duration-300 group"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
