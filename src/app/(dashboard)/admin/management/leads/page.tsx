'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Mail, Building, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LEAD_STATUSES } from '@/lib/constants';

// Dummy leads data
const initialLeads = [
  { id: '1', name: 'John Doe', company: 'TechNova', status: 'onboarded', value: '₹12,000', source: 'Meta Ads' },
  { id: '2', name: 'Sarah Smith', company: 'Lumina', status: 'step 1', value: '₹8,500', source: 'Organic' },
  { id: '3', name: 'Mike Johnson', company: 'Apex', status: 'step 2', value: '₹24,000', source: 'Referral' },
  { id: '4', name: 'Emma Wilson', company: 'Verve', status: 'done', value: '₹15,000', source: 'Google Ads' },
  { id: '5', name: 'David Brown', company: 'Nexus', status: 'onboarded', value: '₹5,000', source: 'Direct' },
];

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', value: '', source: '' });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('leadId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;

    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status } : lead
    ));
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    setLeads([...leads, {
      id: Math.random().toString(36).substring(2, 9),
      name: newLead.name,
      company: newLead.company,
      status: 'onboarded',
      value: newLead.value,
      source: newLead.source,
    }]);
    setIsModalOpen(false);
    setNewLead({ name: '', company: '', value: '', source: '' });
  };

  const leadsByStatus = LEAD_STATUSES.reduce((acc, status) => {
    acc[status] = leads.filter(lead => 
      lead.status === status && 
      (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return acc;
  }, {} as Record<string, typeof leads>);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Lead Pipeline</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage and track incoming leads across all stages.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search leads..." 
              className="pl-9 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none px-4 sm:px-2">
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="flex-[3] sm:flex-none whitespace-nowrap" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Lead
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-y-auto xl:overflow-x-auto pb-4 gap-6 min-h-0">
        {LEAD_STATUSES.map((status) => (
          <div 
            key={status}
            className="flex flex-col w-full xl:w-[320px] xl:min-w-[320px] bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 shrink-0 border border-gray-200/50 dark:border-gray-800/50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{status.replace(/-/g, ' ')}</h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                {leadsByStatus[status]?.length || 0}
              </span>
            </div>

            <div className="flex-1 xl:overflow-y-auto space-y-3 min-h-[100px]">
              <AnimatePresence>
                {leadsByStatus[status]?.map((lead) => (
                  <motion.div
                    layout
                    key={lead.id}
                    draggable
                    onDragStart={(e: any) => handleDragStart(e, lead.id)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="cursor-grab active:cursor-grabbing bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{lead.company}</h4>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">{lead.value}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{lead.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{lead.source}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Lead Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 pb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md max-h-[75dvh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add New Lead</h3>
               <form onSubmit={handleAddLead} className="space-y-4">
                 <Input label="Company Name" required value={newLead.company} onChange={(e: any) => setNewLead({...newLead, company: e.target.value})} />
                 <Input label="Contact Name" required value={newLead.name} onChange={(e: any) => setNewLead({...newLead, name: e.target.value})} />
                 <Input label="Project Value" required placeholder="₹10,000" value={newLead.value} onChange={(e: any) => setNewLead({...newLead, value: e.target.value})} />
                 <Input label="Lead Source" required placeholder="e.g. Meta Ads, Referrals" value={newLead.source} onChange={(e: any) => setNewLead({...newLead, source: e.target.value})} />
                 <div className="pt-4 flex justify-end gap-3">
                   <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                   <Button type="submit">Save Lead</Button>
                 </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
