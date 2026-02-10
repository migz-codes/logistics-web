'use client'

import type { IComponentProps } from '@/types/react.types'
import { useAnimatedContext } from '../context'

export const AnimatedHeader = ({ children, className }: IComponentProps) => {
  const { headerRef } = useAnimatedContext()

  return (
    <div ref={headerRef} className={className}>
      {children}
    </div>
  )
}
