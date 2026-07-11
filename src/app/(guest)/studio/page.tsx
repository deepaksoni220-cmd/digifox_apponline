'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import PulsingBorder from '@/components/ui/pulsing-border';

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
              className="relative p-8 rounded-3xl bg-transparent border border-gray-200/50 dark:border-gray-800/50 shadow-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 group min-h-[250px] flex flex-col justify-center"
            >
              <div className="absolute inset-0 -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                <PulsingBorder 
                  colorBack="#0f172a" 
                  colors={["#af40ff", "#5b42f3", "#00ddeb"]}
                  roundness={0.2}
                  thickness={0.02}
                  speed={0.5}
                  style={{ width: "100%", height: "100%", borderRadius: "1.5rem" }} 
                />
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center mt-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-lg">
                  <Icon className="h-8 w-8 drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
                  {service.name}
                </h3>
                <p className="text-gray-200 leading-relaxed drop-shadow-sm font-medium text-sm">
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
