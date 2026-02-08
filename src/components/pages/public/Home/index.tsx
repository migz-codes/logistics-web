'use client'

import { useTranslations } from 'next-intl'
import { Footer } from '@/components/shared/layout/Footer'
import { ContactSection } from './ContactSection'
import { HeroSection } from './HeroSection'
import { PropertiesSection } from './PropertiesSection'
import { ServicesSection } from './ServicesSection'

export function Home() {
  const t = useTranslations('home')

  return (
    <div className='min-h-screen bg-background-light text-earth transition-colors duration-300'>
      {/* <Navigation
        brandName='Real Estate'
        brandIcon='home'
        links={navLinks}
        showLogin={true}
        showSignIn={true}
      /> */}

      <HeroSection />

      <PropertiesSection />
      <ServicesSection />
      <ContactSection />

      <Footer brandName={t('brandName')} brandIcon='home' brandSubtitle={t('brandSubtitle')} />
    </div>
  )
}
