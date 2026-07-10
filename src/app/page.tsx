'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SlideToLogin } from '@/components/ui/slide-to-login';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    // Simulate login for now - route based on email just for demo
    setTimeout(() => {
      setLoading(false);
      if (email.includes('admin')) {
        window.location.href = '/admin';
      } else if (email.includes('employee')) {
        window.location.href = '/employee';
      } else {
        window.location.href = '/client';
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-dvh items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <div className="absolute inset-0 z-[-1] grid-bg opacity-30 dark:opacity-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex justify-center">
            <img src="/logo.png" alt="Digifox Logo" className="h-20 w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Digifox App</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <Card className="border-gray-200/50 shadow-2xl shadow-gray-200/50 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/80 dark:shadow-none mb-4">
          <CardHeader className="pb-6">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>If you don't have an account, please contact the admin.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email / User ID"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900" />
                  Remember me
                </label>
              </div>
              
              <div className="pt-2">
                <SlideToLogin 
                  loading={loading} 
                  onSuccess={() => {
                    handleLogin();
                  }} 
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Guest Login Option */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Not a client or employee?</p>
          <div className="px-4">
            <SlideToLogin 
              text="Slide for Guest Access"
              loadingText="Entering Guest Mode..."
              onSuccess={() => {
                setTimeout(() => {
                  window.location.href = '/home';
                }, 500);
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
