'use client'

import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Info } from './Info'
import { Properties } from './Properties'

export function InventoryTable() {
  return (
    <Card padding='none'>
      <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
          <thead>
            <tr className='text-[10px] font-black uppercase tracking-widest text-earth/40 border-b border-primary/5'>
              <th className='p-4 text-left'>Property</th>
              <th className='p-4 text-left'>Region</th>
              <th className='p-4 text-left'>Category</th>
              <th className='p-4 text-right'>Area</th>
              <th className='p-4 text-center'>Status</th>
              <th className='p-4 text-right'>Price</th>
              <th className='p-4 text-center'>Actions</th>
            </tr>
          </thead>

          <Properties />
        </table>
      </div>

      {/* Pagination */}
      <div className='p-4 border-t border-primary/5 flex items-center justify-between'>
        <Info />

        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='p-2 rounded-lg hover:bg-primary/10 text-earth/40 hover:text-primary transition-colors'
          >
            <Icon name='chevron_left' />
          </button>

          <button
            type='button'
            className='w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold'
          >
            1
          </button>

          <button
            type='button'
            className='w-8 h-8 rounded-lg hover:bg-primary/10 text-earth/60 text-xs font-bold'
          >
            2
          </button>

          <button
            type='button'
            className='w-8 h-8 rounded-lg hover:bg-primary/10 text-earth/60 text-xs font-bold'
          >
            3
          </button>

          <button
            type='button'
            className='p-2 rounded-lg hover:bg-primary/10 text-earth/40 hover:text-primary transition-colors'
          >
            <Icon name='chevron_right' />
          </button>
        </div>
      </div>
    </Card>
  )
}
