import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/constants';
import { Sparkles } from 'lucide-react';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/50 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img src="/logo.png" alt="Digifox Logo" className="h-12 w-auto object-contain" />
            <span className="hidden text-xl font-bold tracking-tight text-gray-900 dark:text-white">Digifox</span>
          </Link>
          
          <nav className="hidden md:flex md:items-center md:gap-8">
            {NAV_ITEMS.guest.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle className="hidden sm:flex" />
            <Link href="/login">
              <Button size="sm" variant="primary" className="rounded-full px-5">
                Client Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-900 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="Digifox Logo" className="h-16 w-auto object-contain" />
            <span className="hidden text-xl font-bold tracking-tight text-gray-900 dark:text-white">Digifox</span>
          </div>
          <p className="max-w-md text-sm text-gray-500 dark:text-gray-400 mb-8">
            Premium digital agency crafting exceptional websites, Shopify stores, and growth solutions.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Digifox. All rights reserved.
          </div>
        </div>
      </footer>
      <MobileBottomNav role="guest" />
    </div>
  );
}
