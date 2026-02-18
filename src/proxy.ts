import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { defaultLocale, validLocales } from '@/i18n/request'

const intlMiddleware = createMiddleware({ locales: validLocales, defaultLocale: defaultLocale })

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          supabaseResponse = NextResponse.next({
            request
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        }
      }
    }
  )

  const { data } = await supabase.auth.getClaims()

  const user = data?.claims
  const isAuthenticated = !!user
  const pathname = request.nextUrl.pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const locale = pathSegments.find((seg) => validLocales.includes(seg)) || defaultLocale

  const isAuthRoute =
    pathname.endsWith('/signin') || pathname.endsWith('/signup') || pathname.includes('/auth/')

  const pathWithoutLocale = pathSegments.filter((seg) => !validLocales.includes(seg)).join('/')
  const isAdminRoute = pathWithoutLocale.startsWith('admin')

  if (!isAuthenticated && isAdminRoute) {
    const url = new URL(`/${locale}/signin`, request.url)
    url.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthenticated && isAuthRoute) {
    const url = new URL(`/${locale}/admin/dashboard`, request.url)
    return NextResponse.redirect(url)
  }

  return intlMiddleware(request) || NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
