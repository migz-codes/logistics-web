import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { AnimatedContainer } from './AnimatedContainer'

export async function SearchBar() {
  const t = await getTranslations('home.searchBar')

  return (
    <AnimatedContainer className='relative z-40 mt-16 px-6 max-w-6xl mx-auto mb-16 opacity-0'>
      <div className='bg-white rounded-[2.5rem] shadow-2xl p-4 flex flex-col lg:flex-row items-stretch gap-2 border border-primary/5'>
        <div className='flex-1 grid grid-cols-1 md:grid-cols-3 items-center'>
          {/* Property Type */}
          <div className='px-8 py-4 border-r border-earth/10'>
            <div className='flex items-center gap-3 mb-1'>
              <Icon name='apartment' className='text-primary' size='md' />
              <label
                htmlFor='property-type'
                className='block text-[11px] font-bold text-primary/60 uppercase tracking-widest'
              >
                {t('propertyType')}
              </label>
            </div>
            <select
              id='property-type'
              className='block w-full border-none bg-transparent p-0 text-lg font-bold focus:ring-0 cursor-pointer text-earth'
            >
              <option>{t('showAll')}</option>
              <option>{t('apartment')}</option>
              <option>{t('villa')}</option>
              <option>{t('office')}</option>
            </select>
          </div>

          {/* BHK */}
          <div className='px-8 py-4 border-r border-earth/10'>
            <div className='flex items-center gap-3 mb-1'>
              <Icon name='king_bed' className='text-primary' size='md' />
              <label
                htmlFor='bhk'
                className='block text-[11px] font-bold text-primary/60 uppercase tracking-widest'
              >
                {t('bhk')}
              </label>
            </div>
            <select
              id='bhk'
              className='block w-full border-none bg-transparent p-0 text-lg font-bold focus:ring-0 cursor-pointer text-earth'
            >
              <option>{t('atLeast2')}</option>
              <option>{t('oneBhk')}</option>
              <option>{t('twoBhk')}</option>
              <option>{t('threePlusBhk')}</option>
            </select>
          </div>

          {/* Price Range */}
          <div className='px-8 py-4'>
            <div className='flex items-center gap-3 mb-1'>
              <Icon name='payments' className='text-primary' size='md' />
              <label
                htmlFor='price-range'
                className='block text-[11px] font-bold text-primary/60 uppercase tracking-widest'
              >
                {t('priceRange')}
              </label>
            </div>
            <select
              id='price-range'
              className='block w-full border-none bg-transparent p-0 text-lg font-bold focus:ring-0 cursor-pointer text-earth'
            >
              <option>₹ 23 L - ₹ 5 Cr</option>
              <option>₹ 50 L - ₹ 1 Cr</option>
              <option>₹ 1 Cr - ₹ 10 Cr</option>
            </select>
          </div>
        </div>

        <Button
          size='lg'
          iconPosition='left'
          variant='secondary'
          icon={<Icon name='search' size='lg' />}
          className='lg:w-48 py-6 font-black uppercase tracking-widest rounded-[1.75rem]'
        >
          {t('search')}
        </Button>
      </div>
    </AnimatedContainer>
  )
}
