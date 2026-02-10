'use client'

import type { IStyleComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedContainer = ({ children, className, style }: IStyleComponentProps) => {
  const { containerRef } = useAnimatedContext()

  return (
    <section ref={containerRef} className={className} style={style}>
      {children}
    </section>
  )
}
