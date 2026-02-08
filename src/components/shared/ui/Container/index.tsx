import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ children, className = '', size = 'lg' }: ContainerProps) {
    const sizes = {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1600px]',
        full: 'max-w-full'
    }

    return (
        <div className={cn('mx-auto px-6', sizes[size], className)}>
            {children}
        </div>
    )
}
