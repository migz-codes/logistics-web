import { Footer } from '@/components/shared/layout/Footer'
import { CoreValues } from './CoreValues'
import { CtaSection } from './CtaSection'
import { HeroSection } from './HeroSection'
import { RoadmapSection } from './RoadmapSection'

export function FutureVisionPage() {
  return (
    <div className='min-h-screen bg-background-light text-earth transition-colors duration-300'>
      <HeroSection />
      <RoadmapSection />
      <CoreValues />
      <CtaSection />

      <Footer />
    </div>
  )
}
