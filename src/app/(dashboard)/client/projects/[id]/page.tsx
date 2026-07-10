'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_STAGES } from '@/lib/constants';
import { CheckCircle2, Circle, Clock, FileText, MessageSquare, ChevronDown } from 'lucide-react';

export default function ClientProjectTrackerPage() {
  const [expandedStage, setExpandedStage] = useState<string | null>('step-2');
  
  // Dummy data for current project state
  const currentStageIndex = 2; // Step 2 is in progress

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Project: Aura 3D E-Commerce</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Track the live progress of your project.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm p-6 sm:p-10">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gray-100 dark:bg-gray-800" />
          
          <div className="space-y-8">
            {PROJECT_STAGES.map((stage, index) => {
              const isCompleted = index < currentStageIndex;
              const isActive = index === currentStageIndex;
              const isPending = index > currentStageIndex;
              const isExpanded = expandedStage === stage.id;

              return (
                <div key={stage.id} className="relative z-10">
                  <div 
                    className={`flex items-start gap-6 cursor-pointer group ${isPending ? 'opacity-50' : ''}`}
                    onClick={() => !isPending && setExpandedStage(isExpanded ? null : stage.id)}
                  >
                    <div className="mt-1 shrink-0 bg-white dark:bg-gray-900">
                      {isCompleted ? (
                        <CheckCircle2 className="h-14 w-14 text-green-500 bg-white dark:bg-gray-900" />
                      ) : isActive ? (
                        <div className="h-14 w-14 rounded-full border-4 border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center bg-white dark:bg-gray-900">
                          <div className="h-6 w-6 rounded-full bg-indigo-600 animate-pulse" />
                        </div>
                      ) : (
                        <Circle className="h-14 w-14 text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-900" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`text-lg font-semibold ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                            {stage.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {isCompleted ? 'Completed on Oct 12' : isActive ? 'Currently in progress' : 'Upcoming'}
                          </p>
                        </div>
                        
                        {!isPending && (
                          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                      </div>

                      <AnimatePresence>
                        {isExpanded && !isPending && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6 p-5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Deliverables & Updates</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm">
                                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">Initial wireframes approved</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">Color palette selection</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                  <Clock className="h-5 w-5 text-orange-500 shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">Awaiting feedback on 3D models</span>
                                </li>
                              </ul>
                              
                              <div className="mt-6 flex gap-3">
                                <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                  <FileText className="h-4 w-4" /> View Documents
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                  <MessageSquare className="h-4 w-4" /> Leave Feedback
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
