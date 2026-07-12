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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define protected routes
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/employee') || pathname.startsWith('/client');
  
  if (!user && !isAuthRoute && isProtectedRoute) {
    // no user, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is logged in, restrict access based on basic email matching rules from the prototype
  if (user && !isAuthRoute) {
    const email = user.email?.toLowerCase() || '';
    const role = user.user_metadata?.role;
    
    const isAdmin = role === 'admin' || email.includes('admin');
    const isEmployee = role === 'employee' || email.includes('employee') || email.includes('emp_');
    const isClient = !isAdmin && !isEmployee;

    if (pathname.startsWith('/admin') && !isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = isEmployee ? '/employee' : '/client'
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/employee') && !isEmployee) {
      const url = request.nextUrl.clone()
      url.pathname = isAdmin ? '/admin' : '/client'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse;
}
