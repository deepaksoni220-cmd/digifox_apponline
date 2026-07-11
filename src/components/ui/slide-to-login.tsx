'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface SlideToLoginProps {
  onSuccess: () => void;
  loading?: boolean;
  text?: string;
  loadingText?: string;
  variant?: 'default' | 'starry';
}

export function SlideToLogin({ 
  onSuccess, 
  loading = false,
  text = 'Slide to Login',
  loadingText = 'Authenticating...',
  variant = 'default'
}: SlideToLoginProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  
  // Calculate width on mount and resize
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const knobSize = 48; // Size of the draggable knob
  const maxDrag = containerWidth > 0 ? containerWidth - knobSize - 8 : 0; // 8px for padding

  // Create a progress value (0 to 1) based on x position
  const progress = useTransform(x, [0, maxDrag || 1], [0, 1]);
  
  // Transform background opacity based on progress
  const bgOpacity = useTransform(progress, [0, 1], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    // Check if the current x position is past 80% of the track
    if (x.get() > maxDrag * 0.8) {
      setIsSuccess(true);
      controls.start({ x: maxDrag });
      onSuccess();
    } else {
      // Snap back to start
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  // Reset if loading becomes false and it was previously in success state
  useEffect(() => {
    if (!loading && isSuccess) {
      // Small delay so users see the checkmark before reset if auth fails
      const timer = setTimeout(() => {
        setIsSuccess(false);
        controls.start({ x: 0 });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, isSuccess, controls]);

  const isStarry = variant === 'starry';

  return (
    <div 
      ref={containerRef}
      className={`relative flex h-14 w-full items-center rounded-full p-1 overflow-hidden transition-transform duration-300 ${
        isStarry 
          ? 'slide-starry' 
          : 'bg-gray-100 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50'
      }`}
    >
      {isStarry && (
        <>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </>
      )}

      {/* Background fill on drag */}
      {!isStarry && (
        <motion.div 
          className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 origin-left"
          style={{ opacity: bgOpacity, scaleX: progress }}
        />
      )}
      {isStarry && (
        <motion.div 
          className="absolute inset-0 bg-indigo-600/50 backdrop-blur-sm origin-left"
          style={{ opacity: bgOpacity, scaleX: progress, zIndex: 1 }}
        />
      )}
      
      {/* Text in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        <span className={`font-bold tracking-widest transition-opacity duration-300 ${isSuccess ? 'opacity-0' : (isStarry ? 'text-white text-xs text-shadow-sm' : 'text-gray-500 dark:text-gray-400')}`}>
          {loading ? loadingText.toUpperCase() : text.toUpperCase()}
        </span>
        <span className={`absolute font-bold tracking-widest text-white transition-opacity duration-300 ${isSuccess && !loading ? 'opacity-100' : 'opacity-0'}`}>
          SUCCESS!
        </span>
      </div>

      {/* Draggable Knob */}
      <motion.div
        drag={isSuccess || loading ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm cursor-grab active:cursor-grabbing dark:bg-white"
      >
        {isSuccess || loading ? (
          loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          ) : (
            <Check className="h-5 w-5 text-green-500" />
          )
        ) : (
          <ArrowRight className="h-5 w-5 text-gray-900" />
        )}
      </motion.div>
    </div>
  );
}
