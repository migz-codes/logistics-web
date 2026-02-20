import { Badge } from '@/components/shared/ui/Badge'
import { Icon } from '@/components/shared/ui/Icon'

interface PropertyHeaderProps {
  title?: string
  location?: string
  category?: string
  status?: string
}

export function PropertyHeader({
  title = 'Prologis Industrial Park - Section 4',
  location = 'Highway BR-116, km 28 - Southern Industrial Zone, Curitiba/PR',
  category = 'Industrial Logistics',
  status = 'Available Now'
}: PropertyHeaderProps) {
  return (
    <div className='mb-8'>
      <div className='flex items-center gap-2 mb-4'>
        <Badge variant='primary'>{category}</Badge>
        <Badge variant='secondary'>{status}</Badge>
      </div>
      <h1 className='text-4xl md:text-5xl font-extrabold text-neutral-600 mb-2'>{title}</h1>
      <div className='flex items-center gap-2 text-neutral-600/60'>
        <Icon name='location_on' className='text-secondary-500' />
        <span className='font-medium'>{location}</span>
      </div>
    </div>
  )
}
