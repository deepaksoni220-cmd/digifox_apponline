'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MoreHorizontal, Mail, Briefcase, X, Key, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { createAccount } from '@/app/actions/auth';

const initialEmployees = [
  { id: '1', name: 'Alex Rivera', role: 'Senior Developer', email: 'alex@digifox.world', status: 'Active', userId: 'emp_alex@digifox.world', password: 'password123' },
  { id: '2', name: 'Samantha Lee', role: 'UI/UX Designer', email: 'sam@digifox.world', status: 'Active', userId: 'emp_sam@digifox.world', password: 'password123' },
];

export default function EmployeesManagementPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({ id: '', name: '', role: '', email: '', userId: '', password: '' });

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ id: '', name: '', role: '', email: '', userId: '', password: '' });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (emp: any) => {
    setModalMode('edit');
    setFormData(emp);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    if (modalMode === 'add') {
      const authData = new FormData();
      authData.append('email', formData.userId); // userId field is used for login email
      authData.append('password', formData.password);
      authData.append('role', 'employee'); // Set role to employee
      
      const result = await createAccount(authData);
      
      if (!result.success) {
        setErrorMsg(result.error || 'Failed to create user');
        setIsSubmitting(false);
        return;
      }

      setEmployees([...employees, {
        id: Math.random().toString(),
        name: formData.name,
        role: formData.role,
        email: formData.email,
        status: 'Active',
        userId: formData.userId,
        password: formData.password
      }]);
    } else {
      setEmployees(employees.map(emp => emp.id === formData.id ? { ...emp, ...formData } : emp));
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Employee Directory</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage agency staff, roles, and access credentials.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search team..." 
              className="pl-9 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={openAddModal} className="w-full sm:w-auto whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredEmployees.map((emp) => (
            <motion.div
              key={emp.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-lg font-bold text-indigo-700 dark:from-indigo-900/50 dark:to-purple-900/50 dark:text-indigo-300">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{emp.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{emp.role}</p>
                  </div>
                </div>
                <button onClick={() => openEditModal(emp)} className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Edit2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {emp.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Key className="h-4 w-4 text-gray-400" />
                  ID: <span className="font-mono text-xs bg-gray-100 px-1 rounded dark:bg-gray-800">{emp.userId}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  emp.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  {emp.status}
                </span>
                <Button variant="outline" size="sm" className="h-8" onClick={() => openEditModal(emp)}>Manage Access</Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Employee Modal */}
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
                  {modalMode === 'add' ? 'Onboard New Employee' : 'Edit Employee'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input
                      label="Full Name"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label="Role/Title"
                      placeholder="Senior Designer"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="jane@digifox.world"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  {/* Credentials Section */}
                  <div className="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">System Access Credentials</h4>
                    <div className="space-y-4">
                      <Input
                        label="User ID (For Login)"
                        placeholder="emp_janesmith"
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

                <div className="pt-4 flex flex-col gap-3">
                  {errorMsg && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900">
                      {errorMsg}
                    </div>
                  )}
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...
                        </span>
                      ) : (
                        modalMode === 'add' ? 'Save & Invite' : 'Update Credentials'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
