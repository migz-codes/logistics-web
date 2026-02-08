'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
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
  }
]

interface PropertiesSectionProps {
  properties?: Property[]
}

export function PropertiesSection({ properties = defaultProperties }: PropertiesSectionProps) {
  const t = useTranslations('home.properties')

  return (
    <section className='py-32 px-6 relative z-10 bg-white'>
      <SearchBar />

      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6'>
          <div>
            <Badge variant='primary' className='mb-6'>
              {t('featured')}
            </Badge>
            <h2 className='text-5xl md:text-6xl font-extrabold text-earth'>
              {t('ourExclusive')}
              <br />
              {t('properties')}
            </h2>
            <br />
            {t('properties')}
          </div>
          <Button variant='outline' icon={<Icon name='arrow_forward' />}>
            {t('viewAll')}
          </Button>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {properties.map((property) => (
            <div
              key={property.id}
              className='bg-white rounded-3xl overflow-hidden shadow-xl border border-primary/5 hover:-translate-y-2 transition-all group'
            >
              <div className='relative aspect-[4/3] overflow-hidden'>
                <Image
                  src={property.image}
                  alt={property.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  width={800}
                  height={600}
                />
                <div className='absolute top-4 left-4 flex gap-2'>
                  <Badge variant='featured'>{property.type}</Badge>
                  {property.featured && <Badge variant='secondary'>{t('featured')}</Badge>}
                </div>
                <button
                  type='button'
                  className='absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors'
                >
                  <Icon name='favorite_border' className='text-secondary' size='sm' />
                </button>
              </div>

              <div className='p-6'>
                <div className='flex items-center gap-2 text-earth/50 text-sm mb-2'>
                  <Icon name='location_on' size='sm' className='text-primary' />
                  {property.location}
                </div>
                <h3 className='text-xl font-bold text-earth mb-4'>{property.title}</h3>
                <div className='flex items-center gap-6 text-sm text-earth/60 mb-6'>
                  <span className='flex items-center gap-1'>
                    <Icon name='bed' size='sm' /> {property.beds} {t('beds')}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Icon name='bathtub' size='sm' /> {property.baths} {t('baths')}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Icon name='square_foot' size='sm' /> {property.area}
                  </span>
                </div>
                <div className='flex items-center justify-between pt-4 border-t border-primary/5'>
                  <span className='text-2xl font-extrabold text-primary'>{property.price}</span>
                  <Button variant='ghost' size='sm' icon={<Icon name='arrow_forward' />}>
                    {t('details')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
