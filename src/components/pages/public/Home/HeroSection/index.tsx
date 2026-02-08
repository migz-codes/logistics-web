'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/shared'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const t = useTranslations('home.hero')
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !spacerRef.current) return

    const ctx = gsap.context(() => {
      const setSpacerHeight = () => {
        if (heroRef.current && spacerRef.current) {
          spacerRef.current.style.height = `${heroRef.current.offsetHeight}px`
        }
      }

      setSpacerHeight()
      window.addEventListener('resize', setSpacerHeight)

      // Content scroll animation
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=400',
          scrub: 2
        }
      })

      gsap.to(contentRef.current, {
        y: -90,
        duration: 6,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=200',
          scrub: 2
        }
      })

      // Image parallax effect
      if (imageRef.current) {
        // Initial state - slightly offset
        gsap.set(imageRef.current, { y: '-15%' })

        // Parallax scroll effect
        gsap.to(imageRef.current, {
          y: '0%',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
          }
        })

        // Initial animation on load
        gsap.from(imageRef.current, {
          y: '0%',
          duration: 2,
          ease: 'power2.out'
        })
      }

      return () => {
        window.removeEventListener('resize', setSpacerHeight)
      }
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <>
      <header ref={heroRef} className='fixed top-0 left-0 w-full h-[80vh] overflow-hidden z-0'>
        <div className='absolute inset-0 w-full h-full'>
          <div className='absolute inset-0 bg-[#fdfbf7]/80 z-10' />
          <div ref={imageRef} className='w-full h-[100vh]'>
            <Image
              priority
              fill
              src='/home/main.jpg'
              alt='Vibrant neighborhood life'
              className='object-cover h-full border border-red-500'
              sizes='100vw'
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </div>

        <div className='absolute inset-0 lifestyle-gradient' />

        <div
          ref={contentRef}
          className='relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center'
        >
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

      {/* Spacer to maintain layout flow */}
      <div ref={spacerRef} className='relative z-0' />
    </>
  )
}
