import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { AnimatedContainer } from './AnimatedContainer'
import { AnimatedContent } from './AnimatedContent'

gsap.registerPlugin(ScrollTrigger)

export async function PropertiesContent() {
  const t = await getTranslations('home.properties')

  return (
    <AnimatedContainer className='flex flex-wrap md:flex-row justify-between items-center md:items-end gap-6 mb-24 overflow-hidden'>
      <AnimatedContent>
        <Badge variant='primary' className='mb-6'>
          {t('featured')}
        </Badge>

        <h2 className='text-5xl md:text-6xl font-extrabold'>
          <span className='text-neutral-600'>{t('ourExclusive.0')}</span>
          <br />
          <span className='text-secondary-500 italic font-light'>{t('ourExclusive.1')}</span>
        </h2>

        <p className='text-gray-600 mt-4 max-w-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quasi quibusdam saepe
          consequatur eos debitis sapiente nihil cumque odit error minus alias, atque iste, porro
          dolorem, dignissimos facere provident vel.
        </p>
      </AnimatedContent>

      <div className='mt-4 md:mt-0'>
        <Button variant='outline' icon={<Icon name='arrow_forward' />}>
          {t('viewAll')}
        </Button>
      </div>
    </AnimatedContainer>
  )
}
