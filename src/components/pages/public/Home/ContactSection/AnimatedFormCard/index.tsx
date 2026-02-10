'use client'

import type { IComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedFormCard = ({ children, className }: IComponentProps) => {
  const { formCardRef } = useAnimatedContext()

  return (
    <div ref={formCardRef} className={className}>
      {children}
    </div>
  )
}
