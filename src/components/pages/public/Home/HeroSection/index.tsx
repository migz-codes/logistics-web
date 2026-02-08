'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/shared/ui/Button'
export function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <header className='relative h-[90vh] w-full overflow-hidden'>
      <div className='absolute inset-0 w-full h-full object-cover scale-105'>
        <div className='absolute inset-0 bg-white/80 z-10' />

        <Image
          priority
          width={1920}
          height={1080}
          src='/home/main.jpg'
          alt='Vibrant neighborhood life'
          className='absolute inset-0 w-full h-full object-cover scale-105'
        />
      </div>

      <div className='absolute inset-0 lifestyle-gradient' />

      <div className='relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center'>
        <h1 className='text-6xl md:text-8xl font-extrabold text-earth leading-[1.05] mb-8 max-w-4xl'>
          {t('title')}
        </h1>
        <p className='text-earth/80 text-xl max-w-2xl mb-12 leading-relaxed font-medium'>
          {t('subtitle')}
        </p>
        <div className='flex flex-wrap justify-center gap-5'>
          <Button variant='earth' size='lg' className='shadow-2xl'>
            {t('buyButton')}
          </Button>
          <Button
            variant='outline'
            size='lg'
            className='bg-white/90 backdrop-blur-md text-earth border border-earth/10 hover:bg-white shadow-xl'
          >
            {t('sellButton')}
          </Button>
        </div>
      </div>
    </header>
  )
}
