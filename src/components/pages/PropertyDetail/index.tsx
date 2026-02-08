'use client'

import { Navigation } from '@/components/shared/layout/Navigation'
import { Footer } from '@/components/shared/layout/Footer'
import { PropertyHeader } from './PropertyHeader'
import { PropertyGallery } from './PropertyGallery'
import { TechnicalData } from './TechnicalData'
import { LocationSection } from './LocationSection'
import { PropertySidebar } from './PropertySidebar'
import { ContactSection } from './ContactSection'

export function PropertyDetailPage() {
    const navLinks = [
        { href: '#', label: 'Properties' },
        { href: '#', label: 'Market Analysis' },
        { href: '#', label: 'Solutions' },
        { href: '#', label: 'Contact' }
    ]

    return (
        <div className="min-h-screen bg-background-light dark:bg-slate-950 text-earth dark:text-slate-100 transition-colors duration-300">
            <Navigation
                brandName="Logistics Portal"
                brandIcon="warehouse"
                links={navLinks}
                showLogin={false}
                showSignIn={true}
                signInLabel="Portal Login"
            />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                <PropertyHeader />

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
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
                brandName="Logistics Portal"
                brandIcon="warehouse"
                brandSubtitle="B2B Marketplace for Logistics"
            />
        </div>
    )
}
