import Image from 'next/image'
import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

interface PropertiesProps {
  properties: any[]
  t: (key: string) => string
}

export function Properties({ properties, t }: PropertiesProps) {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {properties.map((property: any) => (
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
  )
}
