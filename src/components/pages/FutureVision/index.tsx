'use client'

import { Footer } from '@/components/shared/layout/Footer'
import { Navigation } from '@/components/shared/layout/Navigation'
import { CoreValues } from './CoreValues'
import { CtaSection } from './CtaSection'
import { HeroSection } from './HeroSection'
import { RoadmapSection } from './RoadmapSection'

export function FutureVisionPage() {
  const navLinks = [
    { href: '#', label: 'Properties' },
    { href: '#', label: 'Solutions' },
    { href: '#', label: 'Vision', active: true },
    { href: '#', label: 'Contact' }
  ]

  return (
    <div className='min-h-screen bg-background-light dark:bg-slate-950 text-earth dark:text-slate-100 transition-colors duration-300'>
      <Navigation
        brandName='Logistics Portal'
        brandIcon='warehouse'
        links={navLinks}
        showLogin={true}
        showSignIn={true}
      />

      <HeroSection />
      <RoadmapSection />
      <CoreValues />
      <CtaSection />

      <Footer
        brandName='Logistics Portal'
        brandIcon='warehouse'
        brandSubtitle='Building the Future of Logistics'
      />
    </div>
  )
}
