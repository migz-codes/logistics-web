'use client'

import type { IStyleComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedSpacer = ({ children, className, style }: IStyleComponentProps) => {
  const { spacerRef } = useAnimatedContext()

  return (
    <section ref={spacerRef} className={className} style={style}>
      {children}
    </section>
  )
}
