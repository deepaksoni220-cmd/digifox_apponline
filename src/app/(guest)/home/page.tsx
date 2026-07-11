'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Code, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 grid-bg opacity-40 dark:opacity-20" />
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[100px] dark:bg-indigo-500/10" />
        
        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">

          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
          >
            Everything Your business Needs.<br />
            <span className="gradient-text">One Powerful Platform.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
          >
            An exclusive, high-performance platform for managing leads, clients, projects, portfolio, and employees. Everything you need, beautifully designed.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <Button size="lg" className="h-14 w-full rounded-full px-8 text-base sm:w-auto">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="h-14 w-full rounded-full px-8 text-base sm:w-auto bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
                View Portfolio
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 dark:bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to scale
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Built with cutting-edge technology for maximum performance and a premium user experience.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Lightning Fast',
                icon: Zap,
              },
              {
                title: 'Modern Stack',
                icon: Code,
              },
              {
                title: 'Secured by build',
                icon: Shield,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-gray-200/60 bg-white p-8 shadow-sm dark:border-gray-800/60 dark:bg-gray-950 flex flex-col items-center text-center"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
