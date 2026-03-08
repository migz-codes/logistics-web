'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export function Tooltip({ children, content, side = 'top', align = 'center' }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={5}
            className='z-50 px-3 py-2 text-sm bg-red-500 text-white rounded-lg shadow-lg max-w-xs animate-in fade-in-0 zoom-in-95'
          >
            {content}
            <TooltipPrimitive.Arrow className='fill-red-500' />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
