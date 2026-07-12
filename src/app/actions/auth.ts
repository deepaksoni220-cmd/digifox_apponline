'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  // 1. Get the user's IP Address
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

  const supabase = await createClient();

  if (ip !== 'unknown') {
    // 2. Check failed attempts for this IP today
    const { data: attemptData, error: attemptError } = await supabase
      .from('login_attempts')
      .select('attempts, last_attempt_at')
      .eq('ip_address', ip)
      .single();

    if (attemptData) {
      const lastAttempt = new Date(attemptData.last_attempt_at);
      const today = new Date();
      
      // If it's the same day and attempts >= 5, reject
      if (
        lastAttempt.toDateString() === today.toDateString() &&
        attemptData.attempts >= 5
      ) {
        return { 
          error: 'Too many failed login attempts. Please try again tomorrow or contact support.' 
        };
      }
      
      // If it's a new day, we will reset the attempts later if login fails
    }
  }

  // 3. Attempt Authentication
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // 4. Log the failed attempt
    if (ip !== 'unknown') {
      const { data: existingData } = await supabase
        .from('login_attempts')
        .select('attempts, last_attempt_at')
        .eq('ip_address', ip)
        .single();

      if (existingData) {
        const lastAttempt = new Date(existingData.last_attempt_at);
        const today = new Date();
        
        let newAttempts = existingData.attempts + 1;
        
        // Reset if it's a new day
        if (lastAttempt.toDateString() !== today.toDateString()) {
          newAttempts = 1;
        }

        await supabase
          .from('login_attempts')
          .update({ 
            attempts: newAttempts,
            last_attempt_at: new Date().toISOString()
          })
          .eq('ip_address', ip);
      } else {
        await supabase
          .from('login_attempts')
          .insert({ 
            ip_address: ip, 
            attempts: 1,
            last_attempt_at: new Date().toISOString()
          });
      }
    }

    return { error: error.message };
  }

  // 5. Successful login, optionally clear attempts for this IP (if desired)
  // await supabase.from('login_attempts').delete().eq('ip_address', ip);

  // Return the user data to dictate routing on the client, or we could redirect from here
  const role = data.user.user_metadata?.role;
  return { 
    success: true, 
    user: { email: data.user.email, role } 
  };
}

export async function createAccount(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string || 'client';

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  try {
    const supabaseAdmin = createSupabaseClient(
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
      email_confirm: true,
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
