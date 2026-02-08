'use client'

import { Footer } from '@/components/shared/layout/Footer'
import { ContactSection } from './ContactSection'
import { LocationSection } from './LocationSection'
import { PropertyGallery } from './PropertyGallery'
import { PropertyHeader } from './PropertyHeader'
import { PropertySidebar } from './PropertySidebar'
import { TechnicalData } from './TechnicalData'

export function PropertyDetailPage() {
  return (
    <div className='min-h-screen bg-background-light text-earth transition-colors duration-300'>
      {/* <Navigation
        brandName='Logistics Portal'
        brandIcon='warehouse'
        links={navLinks}
        showLogin={false}
        showSignIn={true}
        signInLabel='Portal Login'
      /> */}

      <main className='max-w-7xl mx-auto px-6 pt-32 pb-24'>
        <PropertyHeader />

        <div className='grid lg:grid-cols-3 gap-12'>
          <div className='lg:col-span-2 space-y-12'>
            <PropertyGallery />
            <TechnicalData />
            <LocationSection />
          </div>
          <aside>
            <PropertySidebar />
          </aside>
        </div>
      </main>

      <ContactSection />

      <Footer
        brandName='Logistics Portal'
        brandIcon='warehouse'
        brandSubtitle='B2B Marketplace for Logistics'
      />
    </div>
  )
}
