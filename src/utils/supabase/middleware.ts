import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from '~/env'

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  // Get session & user data
  const { data: userData } = await supabase.auth.getUser()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname

  const protectedRoutes = ['/new-blog', '/profile', '/dashboard', '/settings']
  const authRoutes = ['/auth/login', '/auth/register']
  const adminRoutes = ['/dashboard']

  const isProtectedPage = protectedRoutes.some((path) =>
    pathname.startsWith(path),
  )
  const isAuthPage = authRoutes.some((path) => pathname.startsWith(path))
  const isAdminPage = adminRoutes.some((path) => pathname.startsWith(path))

  const userRole = (userData?.user?.user_metadata?.role as string) || 'CLIENT'

  // console.log('[Middleware]', { pathname, isProtectedPage, userRole })

  if (session && isAdminPage && userRole !== 'ADMIN') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('message', 'not-admin')
    return NextResponse.redirect(url)
  }

  if (!session && isProtectedPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('message', 'login-required')
    return NextResponse.redirect(url)
  }

  if (session && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('message', 'already-logged-in')
    return NextResponse.redirect(url)
  }

  return response
}
