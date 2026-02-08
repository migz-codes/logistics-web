/** biome-ignore-all lint/style/noHeadElement: main root */
/** biome-ignore-all lint/suspicious/useGoogleFontDisplay: main root */
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
  <html lang='en' className={`${plusJakarta.variable} light`} style={{ colorScheme: 'light' }}>
    <head>
      <link
        href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        rel='stylesheet'
      />
    </head>

    <body className={`${plusJakarta.className} antialiased bg-cream text-earth`}>
      {children}

      {/* Page Links Footer */}
      <div className='fixed bottom-4 right-4 z-50'>
        <div className='bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-primary/20 p-2'>
          <div className='text-xs font-bold text-primary/60 uppercase tracking-widest mb-2 px-2'>
            Quick Links
          </div>
          <ul className='space-y-1 text-xs'>
            <li>
              <a
                href='/'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='/property/1'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                Property Details
              </a>
            </li>
            <li>
              <a
                href='/investors'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                Investors
              </a>
            </li>
            <li>
              <a
                href='/vision'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                Vision
              </a>
            </li>
            <li>
              <a
                href='/admin/dashboard'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                Admin Dashboard
              </a>
            </li>
            <li>
              <a
                href='/admin/inventory'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                Inventory
              </a>
            </li>
            <li>
              <a
                href='/admin/properties/new'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                New Property
              </a>
            </li>
            <li>
              <a
                href='/admin/strategic'
                className='block px-2 py-1 text-earth/70 hover:text-primary transition-colors'
              >
                Strategic
              </a>
            </li>
          </ul>
        </div>
      </div>
    </body>
  </html>
)
