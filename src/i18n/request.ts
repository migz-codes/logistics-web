import type { RequestConfig } from 'next-intl/server'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  const validLocale = locale || 'en'

  return { messages: (await import(`./messages/${validLocale}.json`)).default, locale: validLocale }
})
