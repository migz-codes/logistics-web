'use client'

import type { IStyleComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedImage = ({ children, className, style }: IStyleComponentProps) => {
  const { imageRef } = useAnimatedContext()

  return (
    <section ref={imageRef} className={className} style={style}>
      {children}
    </section>
  )
}
