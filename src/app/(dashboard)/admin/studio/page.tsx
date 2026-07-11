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
  { title: "Onboarded", status: "completed", desc: "Initial requirements gathered.", icon: "CheckCircle" },
  { title: "Step 1", status: "current", desc: "Brand details submitted, UI UX design guide, build starting.", icon: "PenTool" },
  { title: "Step 2", status: "upcoming", desc: "Update as required.", icon: "RefreshCw" },
  { title: "Done", status: "upcoming", desc: "Project finalized and launched.", icon: "Flag" }
];

const ProjectTimeline = () => {
  return (
    <div className="mt-40 mb-20 w-full max-w-7xl mx-auto z-10 relative overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
        >
          Website Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Progress</span>
        </motion.h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Swipe to track the milestones of your digital transformation.</p>
      </div>

      <div className="relative w-full pb-8">
        {/* Horizontal scroll container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 pt-12 px-8 sm:px-12 md:px-24 [&::-webkit-scrollbar]:hidden relative items-start">
          
          {/* Continuous Horizontal Line (Behind nodes) */}
          <div className="absolute top-[80px] left-8 right-8 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0 hidden md:block rounded-full">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-[40%] rounded-full"></div>
          </div>

          {PROJECT_STEPS.map((step, i) => {
            // @ts-ignore
            const Icon = Icons[step.icon] || Icons.Circle;
            const isCurrent = step.status === 'current';
            const isCompleted = step.status === 'completed';
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="relative snap-center shrink-0 w-[280px] sm:w-80 flex flex-col items-center justify-start z-10 group"
              >
                
                {/* Arrow to Next Step */}
                {i < PROJECT_STEPS.length - 1 && (
                  <div className="absolute top-4 -right-8 sm:-right-10 text-indigo-300 dark:text-indigo-600/50 z-0">
                    <Icons.ArrowRight className="w-8 h-8" />
                  </div>
                )}

                {/* Marker */}
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white dark:border-[#0f172a] transition-all duration-500 z-10 ${
                  isCurrent ? 'bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.6)] scale-110' : 
                  isCompleted ? 'bg-indigo-400' : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  {isCompleted ? <Icons.Check className="w-7 h-7 text-white" /> : <Icon className={`w-6 h-6 ${isCurrent ? 'text-white animate-pulse' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />}
                </div>

                {/* Content Box */}
                <div className={`mt-8 w-full p-6 rounded-2xl border transition-all duration-500 text-center relative overflow-hidden backdrop-blur-xl ${
                  isCurrent ? 'border-indigo-400/50 bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 shadow-[0_8px_30px_rgba(99,102,241,0.3)] -translate-y-2' : 
                  isCompleted ? 'border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 shadow-lg shadow-indigo-500/10 hover:-translate-y-1 hover:shadow-indigo-500/20' : 
                  step.title === 'Done' ? 'border-blue-500/40 bg-gradient-to-br from-blue-600/20 to-blue-400/20 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:border-blue-400/60 hover:-translate-y-1 opacity-90 hover:opacity-100' :
                  'border-cyan-500/20 dark:border-cyan-500/20 bg-gradient-to-br from-gray-50/50 to-cyan-50/50 dark:from-gray-900/50 dark:to-cyan-900/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 opacity-90 hover:opacity-100'
                }`}>
                  {isCurrent && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-cyan-400/20 to-indigo-500/20 opacity-60 blur-xl animate-pulse"></div>
                  )}
                  {(!isCurrent && !isCompleted && step.title !== 'Done') && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                  )}
                  {step.title === 'Done' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-lg animate-pulse"></div>
                  )}
                  <div className="relative z-10">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-3 block ${
                      isCurrent ? 'text-indigo-600 dark:text-indigo-400 drop-shadow-sm' : isCompleted ? 'text-indigo-600 dark:text-indigo-400' : step.title === 'Done' ? 'text-blue-500 drop-shadow-sm' : 'text-cyan-600 dark:text-cyan-400'
                    }`}>{step.status}</span>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isCurrent ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300' : 
                      step.title === 'Done' ? 'text-blue-700 dark:text-blue-300' :
                      'text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors'
                    }`}>{step.title}</h3>
                    <p className={`text-sm leading-relaxed ${isCurrent ? 'text-indigo-900/90 dark:text-indigo-100/90 font-medium' : step.title === 'Done' ? 'text-blue-900/80 dark:text-blue-100/80 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
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
