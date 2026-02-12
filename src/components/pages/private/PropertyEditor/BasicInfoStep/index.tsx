'use client'

import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Select } from '@/components/shared/ui/Select'
import { Textarea } from '@/components/shared/ui/Textarea'

interface BasicInfoStepProps {
  onNext: () => void
}

const categoryOptions = [
  { value: '', label: 'Select Category' },
  { value: 'warehouse', label: 'Class A Warehouse' },
  { value: 'cold-storage', label: 'Cold Storage' },
  { value: 'cross-dock', label: 'Cross-Docking Hub' },
  { value: 'last-mile', label: 'Last-Mile Center' }
]

export function BasicInfoStep({ onNext }: BasicInfoStepProps) {
  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-earth mb-8 flex items-center gap-3'>
        <Icon name='info' className='text-primary' />
        Basic Information
      </h2>

      <form className='space-y-6'>
        <Input label='Property Name' placeholder='e.g., Prologis Industrial Park - Section 4' />

        <div className='grid md:grid-cols-2 gap-6'>
          <Select label='Category' options={categoryOptions} />
          <Input label='ZIP Code' placeholder='e.g., 01310-100' />
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          <Input label='Country' placeholder='e.g., Brazil' />
          <Input label='State' placeholder='e.g., SP' />
          <Input label='City' placeholder='e.g., São Paulo' />
        </div>

        <Textarea
          label='Address'
          placeholder='Full property address including street, number'
          rows={1}
        />

        <div className='grid md:grid-cols-2 gap-6'>
          <Input label='Total Area (m²)' placeholder='e.g., 12500' type='number' />
          <Input label='Lease Price (R$/m²)' placeholder='e.g., 22.50' type='number' />
        </div>

        <Textarea
          label='Description'
          placeholder='Describe the property features, highlights, and unique selling points...'
          rows={4}
        />

        <div className='flex justify-end pt-6 border-t border-primary/5'>
          <Button
            variant='primary'
            icon={<Icon name='arrow_forward' />}
            onClick={onNext}
            type='button'
          >
            Next: Technical Specs
          </Button>
        </div>
      </form>
    </Card>
  )
}
