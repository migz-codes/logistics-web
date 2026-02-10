'use client'

import gsap from 'gsap'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

interface AnimationsProviderProps {
  children: ReactNode
}

interface AnimationsContextType {
  contentRef: React.RefObject<HTMLDivElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
}

const AnimationsContext = createContext<AnimationsContextType>({} as AnimationsContextType)

export const AnimationsProvider = ({ children }: AnimationsProviderProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children || []

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
    <AnimationsContext.Provider value={{ contentRef, containerRef }}>
      {children}
    </AnimationsContext.Provider>
  )
}

export const useAnimatedContext = () => {
  return useContext(AnimationsContext)
}
