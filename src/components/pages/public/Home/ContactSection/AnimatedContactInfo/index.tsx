'use client'

import type { IComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedContactInfo = ({ children, className }: IComponentProps) => {
  const { contactInfoRef } = useAnimatedContext()

  return (
    <div ref={contactInfoRef} className={className}>
      {children}
    </div>
  )
}
