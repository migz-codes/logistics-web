/** biome-ignore-all lint/style/noHeadElement: main root */
/** biome-ignore-all lint/suspicious/useGoogleFontDisplay: main root */
import '@radix-ui/themes/styles.css'
import '@/styles/globals.css'
import { Theme } from '@radix-ui/themes'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ApolloProviderWrapper } from '@/lib/apollo/provider'
import { ToastProvider } from '@/lib/toast'
import type { IAppLayoutProps } from './types'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800']
})

export const AppLayout = ({ children }: Readonly<IAppLayoutProps>) => (
  <html lang='en' className={`${plusJakarta.variable} light`} style={{ colorScheme: 'light' }}>
    <head>
      <link
        href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        rel='stylesheet'
      />
    </head>

    <body className={`${plusJakarta.className} antialiased bg-surface-200 text-neutral-600`}>
      <ApolloProviderWrapper>
        <Theme>
          <ToastProvider>{children}</ToastProvider>
        </Theme>
      </ApolloProviderWrapper>
    </body>
  </html>
)
