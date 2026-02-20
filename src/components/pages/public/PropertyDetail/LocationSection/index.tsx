import Image from 'next/image'
import { Icon } from '@/components/shared/ui/Icon'

interface LocationSectionProps {
  title?: string
  markerLabel?: string
  markerDescription?: string
  mapLink?: string
}

export function LocationSection({
  title = 'Strategic Location',
  markerLabel = 'Industrial Hub Center',
  markerDescription = 'Target Location',
  mapLink = '/'
}: LocationSectionProps) {
  return (
    <section className='space-y-6'>
      <div className='flex justify-between items-end'>
        <h3 className='text-2xl font-bold text-neutral-600 flex items-center gap-3'>
          <Icon name='map' className='text-primary-500' />
          {title}
        </h3>

        <a className='text-sm font-bold text-primary-500 hover:underline' href={mapLink}>
          Open in Google Maps
        </a>
      </div>

      <div className='w-full h-[400px] rounded-[2.5rem] bg-surface-200 overflow-hidden relative border border-primary-500/10'>
        <Image
          alt='Map visualization'
          className='w-full h-full object-cover grayscale opacity-50'
          src='https://lh3.googleusercontent.com/aida-public/AB6AXuCOa8d7BN6OttSwmAPIztKImxQB8rgSgZYGotKIb-PTro-Y-N_Do7h_x2iWE_h0WLLHCppjDWHEsbRUVsHe3LWoX1ibEgUxO6e3BJmUcSIOUYE2HPeQjRqHpiE4pXoIKzksZNNJNiVy9X3GZpmgLKJOfR2zCjIM3YamZ0z8dDR1m5of0KB162a_iq82d296NGc08KsggmcsDm6ysjyybBSgm5wpA6awrhJegXswdR2V83AFjzVIpcUqdr_Co6viBSAL4TZUZWB7uzo'
          width={800}
          height={400}
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-2xl shadow-2xl border border-primary-500/20 flex items-center gap-4'>
            <div className='w-12 h-12 bg-primary-500 flex items-center justify-center rounded-xl'>
              <Icon name='warehouse' className='text-white' />
            </div>
            <div>
              <p className='font-bold text-sm'>{markerLabel}</p>
              <p className='text-xs text-neutral-600/60'>{markerDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
