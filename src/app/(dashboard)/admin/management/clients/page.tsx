'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Mail, Building, X, Key, Edit2, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PROJECT_STAGES } from '@/lib/constants';

const initialClients = [
  { id: '1', name: 'Michael Chen', company: 'TechNova', email: 'michael@technova.com', status: 'Active', projectStatus: 'step-1', userId: 'client_technova', password: 'password123' },
  { id: '2', name: 'Sarah Wilson', company: 'Lumina Fashion', email: 'sarah@lumina.com', status: 'Onboarding', projectStatus: 'onboarding', userId: 'client_lumina', password: 'password123' },
];

export default function ClientsManagementPage() {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  
  const [formData, setFormData] = useState({ id: '', name: '', company: '', email: '', userId: '', password: '', projectStatus: 'onboarding' });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ id: '', name: '', company: '', email: '', userId: '', password: '', projectStatus: 'onboarding' });
    setIsModalOpen(true);
  };

  const openEditModal = (client: any) => {
    setModalMode('edit');
    setFormData(client);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'add') {
      setClients([...clients, {
        id: Math.random().toString(),
        name: formData.name,
        company: formData.company,
        email: formData.email,
        status: 'Onboarding',
        projectStatus: formData.projectStatus,
        userId: formData.userId,
        password: formData.password
      }]);
    } else {
      setClients(clients.map(client => client.id === formData.id ? { ...client, ...formData } : client));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Client Management</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage client accounts, their associated projects, and system access.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search clients..." 
              className="pl-9 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={openAddModal} className="w-full sm:w-auto whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 text-lg font-bold text-blue-700 dark:from-blue-900/50 dark:to-cyan-900/50 dark:text-blue-300">
                    {client.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{client.company}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{client.name}</p>
                  </div>
                </div>
                <button onClick={() => openEditModal(client)} className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Edit2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {client.email}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pr-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-gray-400" />
                    ID: <span className="font-mono text-xs bg-gray-100 px-1 rounded dark:bg-gray-800">{client.userId}</span>
                  </div>
                  <div className="text-xs text-gray-400">Pwd: {client.password.replace(/./g, '*')}</div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800 gap-4 sm:gap-0">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {PROJECT_STAGES.find(s => s.id === client.projectStatus)?.name || client.projectStatus}
                </span>
                <Button variant="outline" size="sm" className="h-8 gap-2">
                  <LinkIcon className="h-3 w-3" /> Dashboard
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Client Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 pb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md max-h-[75dvh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {modalMode === 'add' ? 'Add New Client' : 'Edit Client Profile'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input
                      label="Company Name"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label="Point of Contact (Name)"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label="Contact Email Address"
                      type="email"
                      placeholder="john@acme.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Current Project Phase
                    </label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                      value={formData.projectStatus}
                      onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
                    >
                      {PROJECT_STAGES.map((stage) => (
                        <option key={stage.id} value={stage.id}>
                          {stage.icon} {stage.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Credentials Section */}
                  <div className="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Client Portal Credentials</h4>
                    <p className="text-xs text-gray-500 mb-4">You will need to manually share these credentials with the client so they can log into the Client Dashboard.</p>
                    <div className="space-y-4">
                      <Input
                        label="User ID (For Login)"
                        placeholder="client_acmecorp"
                        value={formData.userId}
                        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                        required
                      />
                      <Input
                        label="Password"
                        type="text" // Shown as text so admin can copy it
                        placeholder="Generate a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {modalMode === 'add' ? 'Save Client' : 'Update Credentials'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
