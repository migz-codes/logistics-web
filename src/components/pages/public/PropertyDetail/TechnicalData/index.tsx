'use client'

import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface TechnicalDataItem {
  label: string
  value: string
  description: string
}

const defaultData: TechnicalDataItem[] = [
  { label: 'Total Area', value: '12,500 m²', description: 'GLA (Gross Leasable Area)' },
  { label: 'Ceiling Height', value: '12.5 Meters', description: 'Free height clearance' },
  { label: 'Floor Loading', value: '6 Tons / m²', description: 'Laser leveled floor' },
  { label: 'Loading Docks', value: '18 Automatic', description: 'Levelers included' },
  { label: 'Power Supply', value: '750 kVA', description: 'Dedicated substation' },
  { label: 'Fire Safety', value: 'J4 / K13', description: 'ESFR Sprinklers' }
]

interface TechnicalDataProps {
  data?: TechnicalDataItem[]
  title?: string
}

export function TechnicalData({
  data = defaultData,
  title = 'Technical Datasheet'
}: TechnicalDataProps) {
  return (
    <Card variant='elevated' padding='lg'>
      <h3 className='text-2xl font-bold text-earth mb-8 flex items-center gap-3'>
        <Icon name='analytics' className='text-primary' />
        {title}
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8'>
        {data.map((item, index) => (
          <div key={`${item.label}-${index}`} className='space-y-1'>
            <p className='text-[11px] font-bold text-primary/60 uppercase tracking-widest'>
              {item.label}
            </p>
            <p className='text-xl font-extrabold text-earth'>{item.value}</p>
            <p className='text-xs text-earth/40'>{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
