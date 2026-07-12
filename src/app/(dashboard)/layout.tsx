'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { NAV_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { Sparkles, Bell, Search, Menu, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const role = pathname.startsWith('/admin') ? 'admin' 
             : pathname.startsWith('/employee') ? 'employee' 
             : pathname.startsWith('/client') ? 'client' 
             : 'guest';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.replace('/login');
          return;
        }
      } catch {
        router.replace('/login');
        return;
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-gray-200/50 bg-white/50 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/50 md:flex">
        <div className="flex h-16 items-center px-6 border-b border-gray-200/50 dark:border-gray-800/50">
          <Link href={`/${role}`} className="flex items-center gap-2">
            <img src="/logo.png" alt="Digifox Logo" className="h-12 w-auto object-contain" />
            <span className="hidden text-xl font-bold tracking-tight text-gray-900 dark:text-white">Digifox</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {NAV_ITEMS[role as keyof typeof NAV_ITEMS]?.map((item) => {
            // @ts-ignore
            const Icon = require('lucide-react')[item.icon] || require('lucide-react').Circle;
            const hrefStr = String(item.href);
            const isActive = hrefStr === '/' ? pathname === '/' : pathname.startsWith(hrefStr) && (hrefStr !== '/' || pathname === '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col min-w-0 w-full">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200/50 bg-white/50 px-4 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/50 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href={`/${role}`} className="flex items-center gap-2 md:hidden">
              <img src="/logo.png" alt="Digifox Logo" className="h-12 w-auto object-contain" />
              <span className="hidden text-xl font-bold tracking-tight text-gray-900 dark:text-white">Digifox</span>
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-gray-200/50 bg-gray-100/50 px-3 py-1.5 dark:border-gray-800/50 dark:bg-gray-900/50 md:flex">
              <Search className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Search... (⌘K)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button variant="ghost" className="relative px-2 text-gray-700 dark:text-gray-300">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <Link href="/">
              <Button variant="ghost" className="rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 dark:border-red-900/50 px-3 sm:px-4 h-9 flex items-center gap-2 transition-all shadow-sm">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline text-sm font-bold">Log out</span>
              </Button>
            </Link>
            <div className="hidden sm:block h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shrink-0" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 md:p-8 md:pb-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role={role} />
    </div>
  );
}
