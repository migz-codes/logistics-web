'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export function SearchBar() {
  const t = useTranslations('home.searchBar')
  const searchBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!searchBarRef.current) return

    const ctx = gsap.context(() => {
      // Initial state (hidden and slightly above)
      gsap.set(searchBarRef.current, {
        y: 50,
        opacity: 0
      })

      // Create a timeline for more control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: searchBarRef.current,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
          markers: false,
          onEnter: () => {
            gsap.to(searchBarRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            })
          }
        }
      })

      tl.to(searchBarRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      })
    }, searchBarRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={searchBarRef} className='relative z-40 mt-16 px-6 max-w-6xl mx-auto mb-16 opacity-0'>
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
          variant='secondary'
          size='lg'
          className='lg:w-48 py-6 font-black uppercase tracking-widest rounded-[1.75rem]'
          icon={<Icon name='search' size='lg' />}
          iconPosition='left'
        >
          {t('search')}
        </Button>
      </div>
    </div>
  )
}
