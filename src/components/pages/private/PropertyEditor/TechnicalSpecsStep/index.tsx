'use client'

import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Select } from '@/components/shared/ui/Select'

interface TechnicalSpecsStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function TechnicalSpecsStep({ onNext, onPrevious }: TechnicalSpecsStepProps) {
  const floorTypeOptions = [
    { value: '', label: 'Select Floor Type' },
    { value: 'laser', label: 'Laser Leveled' },
    { value: 'polished', label: 'Polished Concrete' },
    { value: 'epoxy', label: 'Epoxy Coated' }
  ]

  const fireSystemOptions = [
    { value: '', label: 'Select Fire System' },
    { value: 'esfr', label: 'ESFR Sprinklers' },
    { value: 'j4', label: 'J4 Classification' },
    { value: 'k13', label: 'K13 Classification' }
  ]

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-earth mb-8 flex items-center gap-3'>
        <Icon name='analytics' className='text-primary' />
        Technical Specifications
      </h2>

      <form className='space-y-8'>
        {/* Structure */}
        <div>
          <h3 className='text-sm font-bold text-primary uppercase tracking-widest mb-4'>
            Structure
          </h3>
          <div className='grid md:grid-cols-3 gap-6'>
            <Input label='Ceiling Height (m)' placeholder='e.g., 12.5' type='number' />
            <Input label='Floor Loading (t/m²)' placeholder='e.g., 6' type='number' />
            <Select label='Floor Type' options={floorTypeOptions} />
          </div>
        </div>

        {/* Loading */}
        <div>
          <h3 className='text-sm font-bold text-primary uppercase tracking-widest mb-4'>
            Loading Infrastructure
          </h3>
          <div className='grid md:grid-cols-3 gap-6'>
            <Input label='Loading Docks' placeholder='e.g., 18' type='number' />
            <Input label='Ground-Level Doors' placeholder='e.g., 4' type='number' />
            <Input label='Yard Depth (m)' placeholder='e.g., 35' type='number' />
          </div>
        </div>

        {/* Utilities */}
        <div>
          <h3 className='text-sm font-bold text-primary uppercase tracking-widest mb-4'>
            Utilities & Safety
          </h3>
          <div className='grid md:grid-cols-3 gap-6'>
            <Input label='Power Capacity (kVA)' placeholder='e.g., 750' type='number' />
            <Select label='Fire Safety System' options={fireSystemOptions} />
            <Input label='Office Area (m²)' placeholder='e.g., 500' type='number' />
          </div>
        </div>

        {/* Amenities Checkboxes */}
        <div>
          <h3 className='text-sm font-bold text-primary uppercase tracking-widest mb-4'>
            Amenities
          </h3>
          <div className='grid md:grid-cols-3 gap-4'>
            {[
              '24/7 Security',
              'CCTV System',
              'Natural Lighting',
              'Mezzanine Office',
              'Restaurant',
              'Parking Lot',
              'Truck Parking',
              'Fuel Station',
              'Maintenance Shop'
            ].map((amenity) => (
              <label
                key={amenity}
                className='flex items-center gap-3 p-3 bg-cream rounded-xl cursor-pointer hover:bg-primary/10 transition-colors'
              >
                <input
                  type='checkbox'
                  className='w-4 h-4 rounded text-primary focus:ring-primary'
                />
                <span className='text-sm text-earth'>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div className='flex justify-between pt-6 border-t border-primary/5'>
          <Button
            variant='outline'
            icon={<Icon name='arrow_back' />}
            iconPosition='left'
            onClick={onPrevious}
            type='button'
          >
            Previous
          </Button>
          <Button
            variant='primary'
            icon={<Icon name='arrow_forward' />}
            onClick={onNext}
            type='button'
          >
            Next: Media
          </Button>
        </div>
      </form>
    </Card>
  )
}
