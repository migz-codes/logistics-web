import '@/styles/globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { IAppLayoutProps } from './types'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800']
})

export const AppLayout = ({ children }: Readonly<IAppLayoutProps>) => (
  <html lang="en" className={`${plusJakarta.variable} light`} style={{ colorScheme: 'light' }}>
    <head>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />
    </head>
    <body className={`${plusJakarta.className} antialiased bg-cream text-earth`}>
      {children}
    </body>
  </html>
)
