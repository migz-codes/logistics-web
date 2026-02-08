'use client'

import { Footer } from '@/components/shared/layout/Footer'
import { Navigation } from '@/components/shared/layout/Navigation'
import { ContactSection } from './ContactSection'
import { HeroSection } from './HeroSection'
import { PropertiesSection } from './PropertiesSection'
import { SearchBar } from './SearchBar'
import { ServicesSection } from './ServicesSection'

export function LandingPage() {
  const navLinks = [
    { href: '#', label: 'Buy' },
    { href: '#', label: 'Rent' },
    { href: '#', label: 'Sell' },
    { href: '#', label: 'Home loan' }
  ]

  return (
    <div className='min-h-screen bg-background-light dark:bg-background-dark text-earth dark:text-slate-100 transition-colors duration-300'>
      <Navigation
        brandName='Real Estate'
        brandIcon='home'
        links={navLinks}
        showLogin={true}
        showSignIn={true}
      />

      <HeroSection />
      <SearchBar />
      <PropertiesSection />
      <ServicesSection />
      <ContactSection />

      <Footer
        brandName='Real Estate'
        brandIcon='home'
        brandSubtitle='Professional Brokerage Services'
      />
    </div>
  )
}
