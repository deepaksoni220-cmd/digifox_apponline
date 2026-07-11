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
  
  // Dynamically calculate top so they stagger vertically like a stack of cards
  const topOffset = `calc(15vh + ${index * 30}px)`;

  return (
    <div className="h-[60vh] flex items-center justify-center sticky" style={{ top: topOffset }}>
      <motion.div
        className="relative p-12 rounded-3xl shadow-2xl hover:-translate-y-2 transition-transform duration-300 group w-full max-w-4xl min-h-[400px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 -z-10 transition-opacity duration-500 flex items-stretch justify-stretch">
          <PulsingBorder 
            colorBack="#0f172a" 
            colors={["#af40ff", "#5b42f3", "#00ddeb"]}
            roundness={0.2}
            thickness={0.005}
            speed={0.5}
            aspectRatio="auto"
            scale={1}
            style={{ width: "100%", height: "100%", flex: 1, borderRadius: "1.5rem" }} 
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

const PROJECT_STEPS = [
  { title: "Discovery & Strategy", status: "completed", desc: "Understanding goals, audience, and technical requirements.", icon: "Search" },
  { title: "UI/UX Design", status: "completed", desc: "Wireframing, prototyping, and brand integration.", icon: "PenTool" },
  { title: "Frontend Development", status: "current", desc: "Building responsive, animated React interfaces.", icon: "Code2" },
  { title: "Backend Integration", status: "upcoming", desc: "Connecting databases, APIs, and business logic.", icon: "Database" },
  { title: "Testing & Launch", status: "upcoming", desc: "QA, performance tuning, and going live.", icon: "Rocket" }
];

const ProjectTimeline = () => {
  return (
    <div className="mt-40 mb-20 w-full max-w-5xl mx-auto z-10 relative">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
        >
          Website Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Progress</span>
        </motion.h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Track the milestones of your digital transformation.</p>
      </div>

      <div className="relative border-l-2 border-indigo-500/20 dark:border-indigo-500/10 ml-6 md:ml-0 md:border-l-0 mt-12">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 -translate-x-1/2"></div>
        
        {PROJECT_STEPS.map((step, i) => {
          // @ts-ignore
          const Icon = Icons[step.icon] || Icons.Circle;
          const isCurrent = step.status === 'current';
          const isCompleted = step.status === 'completed';
          
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-16 flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* Marker */}
              <div className={`absolute -left-[35px] md:static md:mx-auto z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white dark:border-gray-950 transition-all duration-500 ${
                isCurrent ? 'bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)] scale-110' : 
                isCompleted ? 'bg-indigo-400' : 'bg-gray-200 dark:bg-gray-800'
              }`}>
                {isCompleted ? <Icons.Check className="w-6 h-6 text-white" /> : <Icon className={`w-5 h-5 ${isCurrent ? 'text-white animate-pulse' : 'text-gray-400 dark:text-gray-500'}`} />}
              </div>

              {/* Content Box */}
              <div className={`mt-2 md:mt-0 w-full md:w-[45%] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isCurrent ? 'border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-xl shadow-indigo-500/10' : 
                  isCompleted ? 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:shadow-lg' : 
                  'border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-900/20 opacity-60'
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-widest mb-3 block ${
                    isCurrent ? 'text-indigo-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                  }`}>{step.status}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

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

        {/* Project Progress Section */}
        <ProjectTimeline />
      </div>
    </div>
  );
}
