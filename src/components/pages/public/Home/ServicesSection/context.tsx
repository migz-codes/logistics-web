'use client'

import gsap from 'gsap'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

interface AnimationsProviderProps {
  children: ReactNode
}

interface AnimationsContextType {
  headerRef: React.RefObject<HTMLDivElement | null>
  sectionRef: React.RefObject<HTMLDivElement | null>
  servicesGridRef: React.RefObject<HTMLDivElement | null>
}

const AnimationsContext = createContext<AnimationsContextType>({} as AnimationsContextType)

export const AnimationsProvider = ({ children }: AnimationsProviderProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const servicesGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { y: 50, opacity: 0 })
      gsap.set(servicesGridRef.current?.children || [], { y: 50, opacity: 0 })

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
    <AnimationsContext.Provider value={{ headerRef, sectionRef, servicesGridRef }}>
      {children}
    </AnimationsContext.Provider>
  )
}

export const useAnimatedContext = () => {
  return useContext(AnimationsContext)
}
