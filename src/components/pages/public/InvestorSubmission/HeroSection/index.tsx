'use client'

import { Badge } from '@/components/shared/ui/Badge'
import { Icon } from '@/components/shared/ui/Icon'

export function HeroSection() {
  return (
    <header className='relative pt-32 pb-16 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'>
      <div className='max-w-7xl mx-auto px-6 text-center'>
        <Badge variant='primary' className='mb-6'>
          <Icon name='trending_up' size='sm' className='mr-1' />
          Investment Opportunities
        </Badge>
        <h1 className='text-5xl md:text-7xl font-extrabold text-earth mb-6'>
          Submit Your <br />
          <span className='text-secondary italic font-light'>Project</span>
        </h1>
        <p className='text-xl text-earth/70 max-w-2xl mx-auto leading-relaxed'>
          Partner with us to expand your logistics real estate portfolio. We connect investors with
          premium warehouse properties across Brazil.
        </p>
      </div>
    </header>
  )
}
