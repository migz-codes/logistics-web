import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { Badge, Button, Icon } from '@/components/shared'

gsap.registerPlugin(ScrollTrigger)

export function PropertiesContent() {
  const t = useTranslations('home.properties')

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
      })

      // Animate children with a slight delay
      const children = contentRef.current?.children || []
      gsap.from(children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.2,
        ease: 'power3.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className='flex flex-wrap md:flex-row justify-between items-center md:items-end gap-6 mb-24 overflow-hidden'
    >
      <div ref={contentRef}>
        <Badge variant='primary' className='mb-6'>
          {t('featured')}
        </Badge>

        <h2 className='text-5xl md:text-6xl font-extrabold'>
          <span className='text-earth'>{t('ourExclusive.0')}</span>
          <br />
          <span className='text-secondary italic font-light'>{t('ourExclusive.1')}</span>
        </h2>

        <p className='text-gray-600 mt-4 max-w-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quasi quibusdam saepe
          consequatur eos debitis sapiente nihil cumque odit error minus alias, atque iste, porro
          dolorem, dignissimos facere provident vel.
        </p>
      </div>

      <div className='mt-4 md:mt-0'>
        <Button variant='outline' icon={<Icon name='arrow_forward' />}>
          {t('viewAll')}
        </Button>
      </div>
    </div>
  )
}
