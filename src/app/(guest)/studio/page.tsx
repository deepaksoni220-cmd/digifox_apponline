'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import PulsingBorder from '@/components/ui/pulsing-border';

const ServiceCard = ({ 
  service, 
  index, 
  progress, 
  total 
}: { 
  service: any; 
  index: number; 
  progress: MotionValue<number>;
  total: number;
}) => {
  // @ts-ignore
  const Icon = Icons[service.icon] || Icons.Code;
  
  // Calculate when this specific card should start scaling down
  // Range is from this card's "turn" to the end of the scroll
  const range = [index * (1 / total), 1];
  
  // Target scale decreases more for earlier cards so they look deeper in the stack
  const targetScale = 1 - ((total - index) * 0.05);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Dynamically calculate top so they stagger vertically like a stack of cards
  const topOffset = `calc(15vh + ${index * 30}px)`;

  return (
    <div className="h-[60vh] flex items-center justify-center sticky" style={{ top: topOffset }}>
      <motion.div
        style={{ scale }}
        className="relative p-12 rounded-3xl bg-[#0f172a] border border-gray-200/50 dark:border-gray-800/50 shadow-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 group w-full max-w-4xl min-h-[400px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 -z-10 transition-opacity duration-500">
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
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md text-white mb-8 group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-lg">
            <Icon className="h-10 w-10 drop-shadow-md" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
            {service.name}
          </h3>
          <p className="text-gray-200 leading-relaxed drop-shadow-sm font-medium text-lg max-w-2xl">
            {service.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function StudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className="relative pb-[30vh]">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-10">
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
        
        <div className="flex flex-col relative w-full items-center mt-20">
          {SERVICES.map((service, i) => (
            <ServiceCard 
              key={service.id}
              service={service} 
              index={i} 
              progress={scrollYProgress}
              total={SERVICES.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
