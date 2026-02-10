'use client'

import gsap from 'gsap'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

interface AnimationsProviderProps {
  children: ReactNode
}

interface AnimationsContextType {
  sectionRef: React.RefObject<HTMLDivElement | null>
  formCardRef: React.RefObject<HTMLDivElement | null>
  contactInfoRef: React.RefObject<HTMLDivElement | null>
}

const AnimationsContext = createContext<AnimationsContextType>({} as AnimationsContextType)

export const AnimationsProvider = ({ children }: AnimationsProviderProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!formCardRef.current || !contactInfoRef.current) return

      const formElements = formCardRef.current.querySelectorAll('.space-y-6 > *')
      const contactItems = contactInfoRef.current.querySelectorAll('.space-y-6 > div')

      gsap.from(formCardRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      gsap.from(contactInfoRef.current, {
        x: 50,
        delay: 0.2,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      gsap.from(formElements, {
        y: 30,
        delay: 0.3,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          start: 'top 75%',
          trigger: sectionRef.current,
          toggleActions: 'play none none none'
        }
      })

      gsap.from(contactItems, {
        y: 30,
        opacity: 0,
        delay: 0.5,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          start: 'top 75%',
          trigger: sectionRef.current,
          toggleActions: 'play none none none'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <AnimationsContext.Provider value={{ sectionRef, formCardRef, contactInfoRef }}>
      {children}
    </AnimationsContext.Provider>
  )
}

export const useAnimatedContext = () => {
  return useContext(AnimationsContext)
}
