import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/shared/ui/Button'
import { AnimatedContent } from './AnimatedContent'
import { AnimatedHero } from './AnimatedHero'
import { AnimatedImage } from './AnimatedImage'
import { AnimatedSpacer } from './AnimatedSpacer'

export async function HeroSection() {
  const t = await getTranslations('home.hero')

  return (
    <>
      <AnimatedHero className='fixed top-0 left-0 w-full h-[80vh] overflow-hidden z-0'>
        <div className='absolute inset-0 w-full h-full'>
          <div className='absolute inset-0 bg-[#fdfbf7]/80 z-10' />

          <AnimatedImage className='w-full h-[100vh]'>
            <Image
              priority
              fill
              src='/home/main.jpg'
              alt='Vibrant neighborhood life'
              className='object-cover h-full border border-red-500'
              sizes='100vw'
              style={{ objectPosition: 'center top' }}
            />
          </AnimatedImage>
        </div>

        <div className='absolute inset-0 lifestyle-gradient' />

        <AnimatedContent className='relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center'>
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
        </AnimatedContent>
      </AnimatedHero>

      <AnimatedSpacer className='relative z-0' />
    </>
  )
}
