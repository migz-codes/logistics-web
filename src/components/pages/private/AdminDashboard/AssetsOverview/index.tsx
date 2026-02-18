'use client'

import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface AssetCategory {
  name: string
  percentage: number
  color: string
}

const defaultCategories: AssetCategory[] = [
  { name: 'Class A Warehouses', percentage: 65, color: 'bg-primary' },
  { name: 'Cross-Docking Hubs', percentage: 20, color: 'bg-secondary' },
  { name: 'Cold Storage', percentage: 10, color: 'bg-sage' },
  { name: 'Last-Mile Centers', percentage: 5, color: 'bg-earth' }
]

interface AssetsOverviewProps {
  title?: string
  totalValue?: string
  categories?: AssetCategory[]
}

export function AssetsOverview({
  title = 'Global Asset Oversight',
  totalValue = 'R$ 1.2B',
  categories = defaultCategories
}: AssetsOverviewProps) {
  return (
    <Card className='h-full'>
      <h3 className='text-lg font-bold text-earth flex items-center gap-2 mb-6'>
        <Icon name='pie_chart' className='text-primary' />
        {title}
      </h3>

      {/* Visualization */}
      <div className='flex items-center justify-center mb-8'>
        <div className='relative'>
          <div className='w-40 h-40 rounded-full border-[16px] border-primary/20 flex items-center justify-center'>
            <div className='text-center'>
              <span className='text-2xl font-black text-earth'>{totalValue}</span>
              <p className='text-[10px] text-earth/40 uppercase tracking-widest'>Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className='space-y-4'>
        {categories.map((category, index) => (
          <div key={`category-${index}-${category.name}`} className='flex items-center gap-3'>
            <div className={`w-3 h-3 rounded-full ${category.color}`} />
            <span className='text-xs text-earth/60 flex-1'>{category.name}</span>
            <span className='text-xs font-bold text-earth'>{category.percentage}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
