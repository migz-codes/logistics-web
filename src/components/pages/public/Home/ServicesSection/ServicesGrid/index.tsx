'use client'

import type { IComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const ServicesGrid = ({ children, className }: IComponentProps) => {
  const { servicesGridRef } = useAnimatedContext()

  return (
    <div ref={servicesGridRef} className={className}>
      {children}
    </div>
  )
}
