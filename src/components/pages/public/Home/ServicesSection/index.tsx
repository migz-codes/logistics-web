'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  icon: string
  translationKey: 'buyProperty' | 'sellProperty' | 'propertyManagement'
}

const defaultServices: Service[] = [
  {
    icon: 'home_work',
    translationKey: 'buyProperty'
  },
  {
    icon: 'sell',
    translationKey: 'sellProperty'
  },
  {
    icon: 'real_estate_agent',
    translationKey: 'propertyManagement'
  }
]

interface ServicesSectionProps {
  services?: Service[]
}

export function ServicesSection({ services = defaultServices }: ServicesSectionProps) {
  const t = useTranslations('home.services')

  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const servicesGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headerRef.current, { y: 50, opacity: 0 })
      gsap.set(servicesGridRef.current?.children || [], { y: 50, opacity: 0 })

      // Animate header section
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      })

      // Animate services grid with stagger
      gsap.to(servicesGridRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='py-32 px-6 bg-white border-y border-primary/5 relative z-10'
    >
      <div className='max-w-7xl mx-auto'>
        <div ref={headerRef} className='text-center mb-20'>
          <Badge variant='primary' className='mb-6'>
            {t('badge')}
          </Badge>
          <h2 className='text-5xl md:text-6xl font-extrabold text-earth mb-6'>
            {t('title')}{' '}
            <span className='text-secondary italic font-light'>{t('offerHighlight')}</span>
          </h2>
          <p className='text-earth/60 max-w-2xl mx-auto text-lg'>{t('description')}</p>
        </div>

        {/* Services Grid */}
        <div ref={servicesGridRef} className='grid md:grid-cols-3 gap-8'>
          {services.map((service) => (
            <div
              key={service.translationKey}
              className='bg-cream rounded-3xl p-10 hover:bg-white hover:shadow-2xl transition-all group border border-primary/5'
            >
              <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all'>
                <Icon
                  name={service.icon}
                  className='text-primary group-hover:text-white'
                  size='xl'
                />
              </div>

              <h3 className='text-2xl font-bold text-earth mb-4'>
                {t(`${service.translationKey}.title`)}
              </h3>

              <p className='text-earth/60 mb-8 leading-relaxed'>
                {t(`${service.translationKey}.description`)}
              </p>

              <ul className='space-y-3 mb-8'>
                {t.raw(`${service.translationKey}.features`).map((feature: string, idx: number) => (
                  <li
                    key={`${service.translationKey}-${idx}`}
                    className='flex items-center gap-3 text-sm text-earth/70'
                  >
                    <Icon name='check_circle' size='sm' className='text-sage' />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant='ghost' icon={<Icon name='arrow_forward' />}>
                {t('learnMore')}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
