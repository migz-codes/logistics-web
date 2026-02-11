import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { proxy as supabaseProxy } from '@/services/supabase/proxy'

// Create i18n middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'pt-BR'],
  defaultLocale: 'en'
})

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request)
  if (intlResponse) {
    return intlResponse
  }

  return await supabaseProxy(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
