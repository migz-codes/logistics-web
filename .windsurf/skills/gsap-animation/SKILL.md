---
name: gsap-animation
description: Manage GSAP animations with a server-side first approach
---

# GSAP Animation Management

This skill provides patterns for managing GSAP animations in a Next.js application with a server-first approach.

## Core Principles

1. **Server Components by Default**

   - Keep components as server components by default
   - Use 'use client' only when necessary
   - Isolate animation logic in client components

2. **Context-Based Animation**
   - Create a single animation context per feature/section
   - Manage all GSAP animations within this context
   - Clean up animations on unmount

## Implementation

### 1. Create Animation Context

```typescript
// features/[feature-name]/context/animation-context.tsx
'use client'

import { createContext, useContext, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimationContextType {
  registerElement: (key: string, element: HTMLElement | null) => void
  animateIn: (key: string, options: GSAPTweenVars) => gsap.core.Tween | null
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map())

  const registerElement = (key: string, element: HTMLElement | null) => {
    if (element) {
      elementsRef.current.set(key, element)
    } else {
      elementsRef.current.delete(key)
    }
  }

  const animateIn = (key: string, options: GSAPTweenVars) => {
    const element = elementsRef.current.get(key)
    if (!element) return null

    return gsap.fromTo(
      element,
      { opacity: 0, y: 20, ...options.from },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
          ...options.scrollTrigger
        },
        ...options
      }
    )
  }

  return (
    <AnimationContext.Provider value={{ registerElement, animateIn }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}
```

### 2. Create Animated Components

```typescript
// features/[feature-name]/components/AnimatedElement.tsx
'use client'

import { useEffect, forwardRef } from 'react'
import { useAnimation } from '../context/animation-context'

interface AnimatedElementProps {
  animationKey: string
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  animationOptions?: GSAPTweenVars
}

export const AnimatedElement = forwardRef<HTMLElement, AnimatedElementProps>(
  (
    {
      as: Tag = 'div',
      animationKey,
      children,
      className = '',
      animationOptions
    },
    ref
  ) => {
    const { registerElement, animateIn } = useAnimation()
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
      const element = elementRef.current
      if (!element) return

      registerElement(animationKey, element)
      if (animationOptions) {
        animateIn(animationKey, animationOptions)
      }

      return () => {
        registerElement(animationKey, null)
      }
    }, [animationKey, animationOptions, registerElement, animateIn])

    return (
      <Tag ref={elementRef} className={className}>
        {children}
      </Tag>
    )
  }
)

AnimatedElement.displayName = 'AnimatedElement'
```

### 3. Usage in Server Components

```typescript
// features/[feature-name]/components/FeatureSection.tsx
import { AnimationProvider } from '../context/animation-context'
import { AnimatedElement } from './AnimatedElement'

// This is a Server Component by default
export async function FeatureSection() {
  return (
    <AnimationProvider>
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <AnimatedElement
            as='h2'
            animationKey='title'
            animationOptions={{
              from: { y: 30, opacity: 0 },
              duration: 0.8,
              delay: 0.2
            }}
            className='text-4xl font-bold mb-8'
          >
            Feature Title
          </AnimatedElement>
        </div>
      </section>
    </AnimationProvider>
  )
}
```

## Best Practices

1. **Component Structure**

   - Keep server components at the top level
   - Isolate client components with animations
   - Use composition to minimize client components

2. **Performance**

   - Use `useRef` for DOM references
   - Clean up animations on unmount
   - Reuse animation configurations

3. **Organization**
   - Group related animations in the same context
   - Keep animation logic separate from business logic
   - Use meaningful keys for animated elements

## Common Patterns

### Staggered Animations

```typescript
// In your animation context
const animateStagger = (
  parentKey: string,
  childSelector: string,
  options: GSAPTweenVars
) => {
  const parent = elementsRef.current.get(parentKey)
  if (!parent) return []

  const children = Array.from(parent.querySelectorAll(childSelector))
  return gsap.fromTo(
    children,
    { opacity: 0, y: 20, ...options.from },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        ...options.scrollTrigger
      },
      ...options
    }
  )
}
```

### Page Transitions

```typescript
// features/transition/context/transition-context.tsx
'use client'

export function usePageTransition() {
  const animatePageIn = (element: HTMLElement) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    )
  }

  const animatePageOut = (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power3.in'
    })
  }

  return { animatePageIn, animatePageOut }
}
```

## Testing

```typescript
// __tests__/features/[feature-name]/AnimatedElement.test.tsx
import { render, screen } from '@testing-library/react'
import { AnimationProvider } from '@/features/[feature-name]/context/animation-context'
import { AnimatedElement } from '@/features/[feature-name]/components/AnimatedElement'

describe('AnimatedElement', () => {
  it('renders with correct props', () => {
    render(
      <AnimationProvider>
        <AnimatedElement animationKey='test' as='div'>
          Test Content
        </AnimatedElement>
      </AnimationProvider>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
```

## Troubleshooting

1. **Animations not working?**

   - Ensure GSAP and ScrollTrigger are properly registered
   - Check if the element exists in the DOM when animation starts
   - Verify the ScrollTrigger start/end values

2. **Memory Leaks?**

   - Always clean up animations in useEffect return
   - Use gsap.killTweensOf() for complex animations

3. **Performance Issues?**
   - Use will-change CSS property for better performance
   - Consider using CSS transforms over layout properties
   - Limit the number of simultaneous animations
