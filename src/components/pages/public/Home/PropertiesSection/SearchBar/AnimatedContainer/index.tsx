'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import type { IComponentProps } from '@/types/react.types'

gsap.registerPlugin(ScrollTrigger)

export const AnimatedContainer = ({ children, className }: IComponentProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!searchBarRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(searchBarRef.current, {
        y: 50,
        opacity: 0
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: searchBarRef.current,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
          markers: false,
          onEnter: () => {
            gsap.to(searchBarRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            })
          }
        }
      })

      tl.to(searchBarRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      })
    }, searchBarRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={searchBarRef} className={className}>
      {children}
    </div>
  )
}
