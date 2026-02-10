'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

interface AnimationsProviderProps {
  children: ReactNode
}

interface AnimationsContextType {
  heroRef: React.RefObject<HTMLElement | null>
  imageRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  spacerRef: React.RefObject<HTMLDivElement | null>
}

const AnimationsContext = createContext<AnimationsContextType>({} as AnimationsContextType)

gsap.registerPlugin(ScrollTrigger)

export const AnimationsProvider = ({ children }: AnimationsProviderProps) => {
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

      if (imageRef.current) {
        gsap.set(imageRef.current, { y: '-15%' })

        gsap.to(imageRef.current, {
          y: '0%',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
          }
        })

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
    <AnimationsContext.Provider value={{ heroRef, imageRef, contentRef, spacerRef }}>
      {children}
    </AnimationsContext.Provider>
  )
}

export const useAnimatedContext = () => {
  return useContext(AnimationsContext)
}
