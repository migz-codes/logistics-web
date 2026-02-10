'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import type { IStyleComponentProps } from '@/types/react.types'

export const AnimatedSection = ({ children, className, style }: IStyleComponentProps) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { backgroundColor: 'rgba(255, 255, 255, 0)' })

      gsap.to(sectionRef.current, {
        duration: 0.8,
        ease: 'power2.out',
        backgroundColor: 'rgba(253, 251, 247, 1)',
        scrollTrigger: {
          scrub: 0.8,
          end: 'top 30%',
          markers: false,
          start: 'top 80%',
          trigger: sectionRef.current
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={className} style={style}>
      {children}
    </section>
  )
}
