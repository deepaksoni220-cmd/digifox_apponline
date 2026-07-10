'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Maximize2, Globe } from 'lucide-react';
import Link from 'next/link';

export function WebsitePreview() {
  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white/40 shadow-xl shadow-gray-200/50 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/40 dark:shadow-none overflow-hidden flex flex-col">
      {/* Fake Browser Chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-gray-800/50 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 px-8">
          <div className="mx-auto flex h-7 max-w-sm items-center justify-center gap-2 rounded-md bg-white/60 dark:bg-black/40 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Globe className="h-3 w-3" />
            digifox.world
          </div>
        </div>
        <div className="flex gap-3 text-gray-400">
          <Link href="https://digifox.world" target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Iframe Content */}
      <div className="relative w-full aspect-video sm:aspect-[21/9] lg:aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden group">
        {/* Loading overlay - shown until iframe loads or as a fallback */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <span className="w-8 h-8 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-4"></span>
          <span className="text-sm font-medium text-gray-500">Loading live preview...</span>
        </div>
        
        {/* Live Site */}
        <iframe 
          src="https://digifox.world" 
          className="absolute inset-0 w-full h-full z-10 bg-white dark:bg-gray-950"
          title="Digifox World Live Website"
          sandbox="allow-scripts allow-same-origin"
        />
        
        {/* Overlay intercept to prevent accidental scrolling when trying to scroll the page */}
        <div className="absolute inset-0 z-20 bg-transparent" />
        
        {/* Hover interaction hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href="https://digifox.world" target="_blank">
            <button className="flex items-center gap-2 rounded-full bg-gray-900/90 dark:bg-white/90 backdrop-blur-md px-5 py-2 text-sm font-medium text-white dark:text-gray-900 shadow-xl hover:scale-105 transition-transform">
              Visit Live Site <ExternalLink className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
