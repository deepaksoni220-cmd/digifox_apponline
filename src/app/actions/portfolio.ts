'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPortfolioItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching portfolio items:', error);
    return [];
  }
  return data || [];
}

export async function addPortfolioItem(item: { title: string; category: string; link: string; description: string }) {
  const supabase = await createClient();
  
  // Verify admin/employee role
  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.user_metadata?.role;
  const email = user?.email?.toLowerCase() || '';
  const isAdmin = role === 'admin' || email.includes('admin');
  
  if (!isAdmin) {
    return { error: 'Unauthorized' };
  }

  const { data, error } = await supabase
    .from('portfolio_projects')
    .insert([item])
    .select()
    .single();

  if (error) return { error: error.message };
  
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  revalidatePath('/client/portfolio');
  revalidatePath('/employee/portfolio');
  
  return { data };
}

export async function updatePortfolioItem(id: number, updates: { title?: string; category?: string; link?: string; description?: string }) {
  const supabase = await createClient();
  
  // Verify admin/employee role
  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.user_metadata?.role;
  const email = user?.email?.toLowerCase() || '';
  const isAdmin = role === 'admin' || email.includes('admin');
  
  if (!isAdmin) {
    return { error: 'Unauthorized' };
  }

  const { data, error } = await supabase
    .from('portfolio_projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return { error: error.message };
  
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  revalidatePath('/client/portfolio');
  revalidatePath('/employee/portfolio');
  
  return { data };
}

export async function deletePortfolioItem(id: number) {
  const supabase = await createClient();
  
  // Verify admin role
  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.user_metadata?.role;
  const email = user?.email?.toLowerCase() || '';
  const isAdmin = role === 'admin' || email.includes('admin');
  
  if (!isAdmin) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', id);

  if (error) return { error: error.message };
  
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  revalidatePath('/client/portfolio');
  revalidatePath('/employee/portfolio');
  
  return { success: true };
}
