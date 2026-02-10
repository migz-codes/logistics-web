import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { AnimatedSection } from './AnimatedSection'
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

export async function PropertiesSection({
  properties = defaultProperties
}: PropertiesSectionProps) {
  const t = await getTranslations('home.properties')

  return (
    <AnimatedSection
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
    </AnimatedSection>
  )
}
