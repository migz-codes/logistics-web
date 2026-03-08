import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { defaultLocale, validLocales } from '@/i18n/request'

const intlMiddleware = createMiddleware({ locales: validLocales, defaultLocale: defaultLocale })

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const locale = pathSegments.find((seg) => validLocales.includes(seg)) || defaultLocale

  const accessToken = request.cookies.get('accessToken')?.value
  const isAuthenticated = !!accessToken

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
