'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

export function SearchBar() {
  return (
    <section className='relative z-40 -mt-16 px-6 max-w-6xl mx-auto'>
      <div className='bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-4 flex flex-col lg:flex-row items-stretch gap-2 border border-primary/5'>
        <div className='flex-1 grid grid-cols-1 md:grid-cols-3 items-center'>
          {/* Property Type */}
          <div className='px-8 py-4 border-r border-earth/10 dark:border-white/10'>
            <div className='flex items-center gap-3 mb-1'>
              <Icon name='apartment' className='text-primary' size='md' />
              <label className='block text-[11px] font-bold text-primary/60 uppercase tracking-widest'>
                Property Type
              </label>
            </div>
            <select className='block w-full border-none bg-transparent p-0 text-lg font-bold focus:ring-0 cursor-pointer text-earth dark:text-white'>
              <option>Show all</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Office</option>
            </select>
          </div>

          {/* BHK */}
          <div className='px-8 py-4 border-r border-earth/10 dark:border-white/10'>
            <div className='flex items-center gap-3 mb-1'>
              <Icon name='king_bed' className='text-primary' size='md' />
              <label className='block text-[11px] font-bold text-primary/60 uppercase tracking-widest'>
                BHK
              </label>
            </div>
            <select className='block w-full border-none bg-transparent p-0 text-lg font-bold focus:ring-0 cursor-pointer text-earth dark:text-white'>
              <option>At-list 2</option>
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3+ BHK</option>
            </select>
          </div>

          {/* Price Range */}
          <div className='px-8 py-4'>
            <div className='flex items-center gap-3 mb-1'>
              <Icon name='payments' className='text-primary' size='md' />
              <label className='block text-[11px] font-bold text-primary/60 uppercase tracking-widest'>
                Price Range
              </label>
            </div>
            <select className='block w-full border-none bg-transparent p-0 text-lg font-bold focus:ring-0 cursor-pointer text-earth dark:text-white'>
              <option>₹ 23 L - ₹ 5 Cr</option>
              <option>₹ 50 L - ₹ 1 Cr</option>
              <option>₹ 1 Cr - ₹ 10 Cr</option>
            </select>
          </div>
        </div>

        <Button
          variant='secondary'
          size='lg'
          className='lg:w-48 py-6 font-black uppercase tracking-widest rounded-[1.75rem]'
          icon={<Icon name='search' size='lg' />}
          iconPosition='left'
        >
          Search
        </Button>
      </div>
    </section>
  )
}
