import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Icon } from '@/components/shared/ui/Icon'

const CRECI = '293146-F'

const links = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact Us' }
]

const socialLinks = [
  { icon: 'thumb_up', href: 'https://facebook.com' },
  { icon: 'alternate_email', href: 'https://twitter.com' },
  { icon: 'photo_camera', href: 'https://instagram.com' }
]

export async function Footer() {
  const t = await getTranslations('home')

  return (
    <footer className='py-24 bg-earth text-white border-t border-white/10 relative z-10'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl backdrop-blur-sm border border-white/20'>
                <Icon name='home' className='text-white' size='lg' />
              </div>

              <h2 className='text-3xl font-black tracking-tight text-white'>{t('brandName')}</h2>
            </div>

            <p className='text-xs text-white/60 font-black uppercase tracking-[0.2em]'>
              {t('brandSubtitle')}
            </p>

            <p className='text-xs text-white/40 font-mono'>CRECI: {CRECI}</p>
          </div>

          <div className='flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 text-sm font-bold uppercase tracking-widest text-white/70'>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className='hover:text-white transition-colors'>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className='mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-[11px] text-white/40 font-bold uppercase tracking-widest'>
            {`© ${new Date().getFullYear()} ${t('brandName')}. ${t('copyright')}`}
          </p>

          <div className='flex gap-6'>
            {socialLinks.map((link, index) => (
              <a
                href={link.href}
                key={`${link.icon}-${index}`}
                className='w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer'
              >
                <Icon name={link.icon} className='text-white/80' size='md' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
