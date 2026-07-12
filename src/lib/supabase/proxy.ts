import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Define protected routes FIRST before any async calls
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/employee') || pathname.startsWith('/client');

  // Only check auth for protected routes to avoid unnecessary calls
  if (isProtectedRoute) {
    let user = null;
    
    try {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        user = data.user;
      }
    } catch (e) {
      // If getUser fails for any reason, treat as unauthenticated
      user = null;
    }

    if (!user) {
      // No authenticated user — block access immediately
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // User is authenticated — enforce role-based access
    const email = user.email?.toLowerCase() || '';
    const role = user.user_metadata?.role;
    
    const isAdmin = role === 'admin' || email.includes('admin');
    const isEmployee = role === 'employee' || email.includes('employee') || email.includes('emp_');

    if (pathname.startsWith('/admin') && !isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = isEmployee ? '/employee' : '/client';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/employee') && !isEmployee) {
      const url = request.nextUrl.clone();
      url.pathname = isAdmin ? '/admin' : '/client';
      return NextResponse.redirect(url);
    }
  } else {
    // For non-protected routes, still refresh the session
    await supabase.auth.getUser();
  }

  return supabaseResponse;
}
