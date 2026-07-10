'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { PROJECT_STAGES } from '@/lib/constants';

// Dummy client projects
const myProjects = [
  {
    id: 'PRJ-1029',
    name: 'Aura 3D Interactive Website',
    service: 'Website Development',
    status: 'step-2', // step 2
    progress: 65,
    startDate: 'Jun 15, 2026',
    lastUpdate: '2 days ago',
  }
];

export default function ClientProjectsPage() {
  const getStageIndex = (statusId: string) => {
    return PROJECT_STAGES.findIndex(s => s.id === statusId);
  };

  // Drag to scroll logic for desktop mouse users
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.dataset.isDragging = 'true';
    el.dataset.startX = (e.pageX - el.offsetLeft).toString();
    el.dataset.scrollLeft = el.scrollLeft.toString();
    el.classList.add('cursor-grabbing');
    el.classList.remove('cursor-grab');
  };

  const handleMouseLeaveOrUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.dataset.isDragging = 'false';
    el.classList.remove('cursor-grabbing');
    el.classList.add('cursor-grab');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.dataset.isDragging !== 'true') return;
    e.preventDefault();
    const startX = parseFloat(el.dataset.startX || '0');
    const scrollLeft = parseFloat(el.dataset.scrollLeft || '0');
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    el.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Projects</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track the real-time progress of your active and completed projects.
        </p>
      </div>

      <div className="grid gap-6">
        {myProjects.map((project, index) => {
          const currentStageIndex = getStageIndex(project.status);
          const currentStage = PROJECT_STAGES[currentStageIndex];
          const isDone = project.status === 'done' || project.status === 'closed';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isDone 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                    }`}>
                      {currentStage?.name || 'In Progress'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.service}</p>
                </div>
                
                <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-1 text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1.5" />
                    Updated {project.startDate}
                  </div>
                  <div className="text-gray-400 text-xs hidden md:block">
                    Last activity {project.lastUpdate}
                  </div>
                </div>
              </div>

              {/* Progress Stepper - Swipe Cards Carousel */}
              <div 
                className="mt-6 -mx-2 px-2 sm:-mx-6 sm:px-6 overflow-x-auto overflow-y-hidden pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                style={{ WebkitOverflowScrolling: 'touch' }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveOrUp}
                onMouseUp={handleMouseLeaveOrUp}
                onMouseMove={handleMouseMove}
              >
                <div className="flex gap-4 w-max pr-6">
                  {PROJECT_STAGES.map((stage, i) => {
                    const isCompleted = i <= currentStageIndex;
                    const isActive = i === currentStageIndex;
                    
                    return (
                      <div 
                        key={stage.id} 
                        className={`relative flex flex-col p-4 w-[160px] sm:w-[180px] rounded-2xl border-2 transition-all duration-300 snap-center shrink-0 ${
                          isActive 
                            ? (isDone ? 'border-green-500 bg-green-50/50 dark:bg-green-500/10 dark:border-green-400' : 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 dark:border-indigo-400 shadow-md shadow-indigo-500/10') 
                            : isCompleted
                              ? 'border-indigo-200 bg-white dark:border-indigo-900/50 dark:bg-gray-950'
                              : 'border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            isCompleted 
                              ? (isDone ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white')
                              : 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <span>{i + 1}</span>}
                          </div>
                          
                          {isActive && !isDone && (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <span className={`text-sm font-bold ${
                            isActive || isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {stage.name}
                          </span>
                          
                          {stage.description && (
                            <span className={`text-xs leading-relaxed ${
                              isActive || isCompleted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                            }`}>
                              {stage.description}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Animated Progress Line */}
              <div className="mt-4 mb-6 relative w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className={`absolute top-0 left-0 h-full rounded-full ${isDone ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} 
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isDone ? 'bg-green-500' : 'bg-indigo-500'}`}></span>
                  {project.progress}% Completed
                </span>
                <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center transition-colors">
                  View Details <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
