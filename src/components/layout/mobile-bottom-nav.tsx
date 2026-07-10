'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import * as Icons from 'lucide-react';

interface MobileBottomNavProps {
  role?: 'admin' | 'employee' | 'client' | 'guest';
}

export function MobileBottomNav({ role = 'guest' }: MobileBottomNavProps) {
  const pathname = usePathname();
  const items = NAV_ITEMS[role];

  return (
    <div className="fixed left-4 right-4 z-50 md:hidden" style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="absolute inset-0 rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-2xl shadow-indigo-900/10 dark:border-white/10 dark:bg-gray-950/60 dark:shadow-black/50" />
      <nav className="relative flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          // @ts-ignore
          const Icon = Icons[item.icon] || Icons.Circle;
          // Exact match for root, otherwise prefix match
          const hrefStr = String(item.href);
          const isActive = hrefStr === '/' ? pathname === '/' : pathname.startsWith(hrefStr) && (hrefStr !== '/' || pathname === '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full py-1 min-h-[56px] focus-visible:outline-none"
            >
              <div
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1 transition-colors duration-200',
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'fill-indigo-600/20')} />
                <span className="text-[10px] font-medium">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-3 h-1 w-8 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
