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

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/employee') || pathname.startsWith('/client');

  if (isProtectedRoute) {
    // FAST CHECK: Look for any Supabase auth cookies first.
    // If none exist at all, there's definitely no session — redirect immediately.
    const allCookies = request.cookies.getAll();
    const hasAuthCookie = allCookies.some(c => c.name.includes('auth-token') || c.name.includes('sb-'));
    
    if (!hasAuthCookie) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // DEEP CHECK: Validate the session with Supabase
    let user = null;
    try {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        user = data.user;
      }
    } catch (e) {
      user = null;
    }

    if (!user) {
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
