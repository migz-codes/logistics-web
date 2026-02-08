'use client'

import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

const benefits = [
  { icon: 'trending_up', label: 'Premium Returns' },
  { icon: 'diversity_3', label: 'Expert Network' },
  { icon: 'security', label: 'Secure Investments' },
  { icon: 'support_agent', label: 'Dedicated Support' }
]

export function PartnerProgram() {
  return (
    <Card variant='elevated' className='bg-earth text-white'>
      <h3 className='text-xl font-bold mb-6'>Why Partner With Us?</h3>
      <div className='space-y-4'>
        {benefits.map((benefit) => (
          <div key={benefit.icon} className='flex items-center gap-4'>
            <div className='w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center'>
              <Icon name={benefit.icon} className='text-secondary' />
            </div>
            <span className='font-medium'>{benefit.label}</span>
          </div>
        ))}
      </div>
      <div className='mt-8 pt-6 border-t border-white/10'>
        <p className='text-sm text-white/70 leading-relaxed'>
          Join 40+ institutional investors managing over{' '}
          <strong className='text-white'>R$ 1.2 billion</strong> in logistics assets across Brazil.
        </p>
      </div>
    </Card>
  )
}
