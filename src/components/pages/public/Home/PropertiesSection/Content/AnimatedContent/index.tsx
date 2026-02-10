'use client'

import type { IStyleComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../../../HeroSection/context'

export const AnimatedContent = ({ children, className, style }: IStyleComponentProps) => {
  const { contentRef } = useAnimatedContext()

  return (
    <section ref={contentRef} className={className} style={style}>
      {children}
    </section>
  )
}
