'use client'
import type { IStyleComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedHero = ({ children, className, style }: IStyleComponentProps) => {
  const { heroRef } = useAnimatedContext()

  return (
    <section ref={heroRef} className={className} style={style}>
      {children}
    </section>
  )
}
