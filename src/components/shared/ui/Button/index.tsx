'use client'

import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'earth' | 'whatsapp' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    children: ReactNode
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
}

export function Button({
    variant = 'primary',
    size = 'md',
    className,
    children,
    icon,
    iconPosition = 'right',
    ...props
}: ButtonProps) {
    const baseClasses = 'font-bold rounded-2xl transition-all inline-flex items-center justify-center gap-2'

    const variants = {
        primary: 'bg-primary text-white hover:bg-sage shadow-lg shadow-primary/10',
        secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20',
        outline: 'border-2 border-primary/20 text-primary hover:bg-primary hover:text-white',
        earth: 'bg-earth text-white hover:bg-earth-dark shadow-lg shadow-earth/10',
        whatsapp: 'bg-[#25D366] text-white hover:bg-[#1fb356] shadow-lg shadow-[#25D366]/20',
        ghost: 'text-earth/70 hover:text-primary'
    }

    const sizes = {
        sm: 'px-6 py-2.5 text-sm',
        md: 'px-8 py-3 text-base',
        lg: 'px-10 py-4 text-lg'
    }

    return (
        <button
            className={cn(baseClasses, variants[variant], sizes[size], className)}
            {...props}
        >
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </button>
    )
}
