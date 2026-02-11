import type { RequestConfig } from 'next-intl/server'
import { getRequestConfig } from 'next-intl/server'

export const defaultLocale = 'pt-br'
export const validLocales = ['pt-br', 'en-us']

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  const validLocale = (() => {
    if (locale) return validLocales.includes(locale) ? locale : defaultLocale
    return defaultLocale
  })()

  return { messages: (await import(`./messages/${validLocale}.json`)).default, locale: validLocale }
})
