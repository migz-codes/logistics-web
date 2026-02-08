'use client'

import gsap from 'gsap'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { Button, Icon } from '@/components/shared'
import { PropertiesContent } from './Content'
import { Properties } from './Properties'
import { SearchBar } from './SearchBar'

interface Property {
  id: string
  title: string
  location: string
  price: string
  image: string
  beds: number
  baths: number
  area: string
  featured?: boolean
  type: string
}

const defaultProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Villa with Pool',
    location: 'Palm Beach, FL',
    price: '$2.5M',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    beds: 5,
    baths: 4,
    area: '4,500 sq ft',
    featured: true,
    type: 'Villa'
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    location: 'Manhattan, NY',
    price: '$4.8M',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 3,
    area: '3,200 sq ft',
    featured: false,
    type: 'Penthouse'
  },
  {
    id: '3',
    title: 'Beachfront Apartment',
    location: 'Miami Beach, FL',
    price: '$1.9M',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    beds: 4,
    baths: 3,
    area: '2,800 sq ft',
    featured: true,
    type: 'Apartment'
  },
  {
    id: '4',
    title: 'Modern Villa with Pool',
    location: 'Palm Beach, FL',
    price: '$2.5M',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    beds: 5,
    baths: 4,
    area: '4,500 sq ft',
    featured: true,
    type: 'Villa'
  },
  {
    id: '5',
    title: 'Downtown Penthouse',
    location: 'Manhattan, NY',
    price: '$4.8M',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 3,
    area: '3,200 sq ft',
    featured: false,
    type: 'Penthouse'
  },
  {
    id: '6',
    title: 'Beachfront Apartment',
    location: 'Miami Beach, FL',
    price: '$1.9M',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    beds: 4,
    baths: 3,
    area: '2,800 sq ft',
    featured: true,
    type: 'Apartment'
  }
]

interface PropertiesSectionProps {
  properties?: Property[]
}

export function PropertiesSection({ properties = defaultProperties }: PropertiesSectionProps) {
  const t = useTranslations('home.properties')

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(sectionRef.current, { backgroundColor: 'rgba(255, 255, 255, 0)' })

      // Create scroll-based animation with matching hero section timing
      gsap.to(sectionRef.current, {
        backgroundColor: 'rgba(253, 251, 247, 1)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.8,
          markers: false
        },
        duration: 0.8
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='py-32 px-6 relative z-10'
      style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
    >
      <div className='max-w-7xl mx-auto'>
        <PropertiesContent />

        <SearchBar />

        <Properties properties={properties} t={t} />

        <div className='mt-4 md:mt-16 mx-auto flex justify-center'>
          <Button variant='outline' icon={<Icon name='arrow_forward' />}>
            {t('viewAll')}
          </Button>
        </div>
      </div>
    </section>
  )
}
