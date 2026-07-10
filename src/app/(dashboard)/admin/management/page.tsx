'use client';

import Link from 'next/link';
import { Users, Plus } from 'lucide-react';

export default function AdminManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Management Center</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage clients, employees, and leads.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/management/leads" className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Pipeline</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">View and manage incoming leads across all stages via Kanban board.</p>
        </Link>

        <Link href="/admin/management/employees" className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Employee Directory</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Manage agency staff, roles, and onboarding invitations.</p>
        </Link>

        <Link href="/admin/management/clients" className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Client Management</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Add clients, manage their access credentials, and track status.</p>
        </Link>
      </div>
    </div>
  );
}
