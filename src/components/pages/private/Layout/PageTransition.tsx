'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
  pageKey: string // Use pageKey to trigger animations
}

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: pageKey is used to trigger page transitions when navigating between different pages
  useEffect(() => {
    if (containerRef.current) {
      // Reset initial state
      gsap.set(containerRef.current, {
        opacity: 0,
        x: 0,
        y: -30,
        scale: 0.98
      })

      // Animate in
      gsap.to(containerRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1 // Slight delay to sync with sidebar animation
      })
    }

    // Cleanup animation on unmount or pageKey change
    return () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.98,
          duration: 0.3,
          ease: 'power2.in'
        })
      }
    }
  }, [pageKey])

  return (
    <div ref={containerRef} className='w-full'>
      {children}
    </div>
  )
}
