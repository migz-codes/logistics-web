'use client'

import type { IComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedSection = ({ children, className }: IComponentProps) => {
  const { sectionRef } = useAnimatedContext()

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  )
}
