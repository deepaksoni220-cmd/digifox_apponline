'use server';

import { createClient } from '@supabase/supabase-js';

export async function createAccount(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string || 'client'; // default to client

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  try {
    // We MUST use the service_role key to bypass RLS and create users directly
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Automatically confirm so they can log in instantly
      user_metadata: { role },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred' };
  }
}
