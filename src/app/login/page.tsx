'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      // In a real app, this would validate credentials and route based on role
      // For this prototype, we'll assume it's a client logging in
      const loginId = email.toLowerCase();
      if (loginId.includes('admin')) {
        router.push('/admin');
      } else if (loginId.includes('employee') || loginId.includes('emp_') || loginId === 'alex@digifox.world' || loginId === 'sam@digifox.world') {
        router.push('/employee');
      } else {
        router.push('/client');
      }
    }, 800);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-gray-50 dark:bg-gray-950">
      <header className="w-full flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src="/logo.png" alt="Digifox Logo" className="h-16 w-auto object-contain" />
          <span className="hidden text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Digifox</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-800/50"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="email" 
                  placeholder="you@company.com" 
                  className="pl-10 h-12 rounded-xl"
                  required
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <a href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl"
                  required
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base mt-4 shadow-md shadow-indigo-600/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center flex flex-col gap-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Not a client yet? <Link href="/contact" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Contact our sales team</Link>
            </p>
            <Link href="/home" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              &larr; Continue as Guest
            </Link>
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50 dark:bg-indigo-900/10 dark:border-indigo-800/30">
            <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 text-center leading-relaxed font-medium">
              Prototype Note: Since there is no live database, routing is based on your email. 
              Use <span className="font-bold">admin@</span> for Admin Dashboard, <span className="font-bold">employee@</span> for Employee Dashboard, and anything else for Client Dashboard.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
