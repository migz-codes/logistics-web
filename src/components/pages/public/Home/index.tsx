import { Footer } from '@/components/shared/layout/Footer'
import { ContactSection } from './ContactSection'
import { HeroSection } from './HeroSection'
import { PropertiesSection } from './PropertiesSection'
import { ServicesSection } from './ServicesSection'

export const Home = () => (
  <div className='min-h-screen bg-background-light text-neutral-600 transition-colors duration-300 relative'>
    <HeroSection />
    <PropertiesSection />
    <ServicesSection />
    <ContactSection />
    <Footer />
  </div>
)
