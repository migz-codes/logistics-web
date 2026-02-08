'use client'

import { Navigation } from '@/components/shared/layout/Navigation'
import { Footer } from '@/components/shared/layout/Footer'
import { HeroSection } from './HeroSection'
import { SearchBar } from './SearchBar'
import { PropertiesSection } from './PropertiesSection'
import { ServicesSection } from './ServicesSection'
import { ContactSection } from './ContactSection'

export function LandingPage() {
    const navLinks = [
        { href: '#', label: 'Buy' },
        { href: '#', label: 'Rent' },
        { href: '#', label: 'Sell' },
        { href: '#', label: 'Home loan' }
    ]

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-earth dark:text-slate-100 transition-colors duration-300">
            <Navigation
                brandName="Real Estate"
                brandIcon="home"
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
                brandName="Real Estate"
                brandIcon="home"
                brandSubtitle="Professional Brokerage Services"
            />
        </div>
    )
}
