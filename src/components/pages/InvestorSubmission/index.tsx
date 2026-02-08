'use client'

import { Navigation } from '@/components/shared/layout/Navigation'
import { Footer } from '@/components/shared/layout/Footer'
import { HeroSection } from './HeroSection'
import { SubmissionForm } from './SubmissionForm'
import { PartnerProgram } from './PartnerProgram'
import { ContactInfo } from './ContactInfo'

export function InvestorSubmissionPage() {
    const navLinks = [
        { href: '#', label: 'Properties' },
        { href: '#', label: 'Investors' },
        { href: '#', label: 'Partners' },
        { href: '#', label: 'Contact' }
    ]

    return (
        <div className="min-h-screen bg-background-light dark:bg-slate-950 text-earth dark:text-slate-100 transition-colors duration-300">
            <Navigation
                brandName="Logistics Portal"
                brandIcon="warehouse"
                links={navLinks}
                showLogin={true}
                showSignIn={true}
                signInLabel="Partner Login"
            />

            <HeroSection />

            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <SubmissionForm />
                    </div>
                    <aside className="space-y-8">
                        <PartnerProgram />
                        <ContactInfo />
                    </aside>
                </div>
            </section>

            <Footer
                brandName="Logistics Portal"
                brandIcon="warehouse"
                brandSubtitle="Investment Platform"
            />
        </div>
    )
}
