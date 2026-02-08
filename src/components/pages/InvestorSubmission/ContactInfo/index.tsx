'use client'

import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

export function ContactInfo() {
  return (
    <Card className='bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10'>
      <h3 className='text-lg font-bold text-earth dark:text-white mb-6'>Need Assistance?</h3>
      <div className='space-y-4'>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
            <Icon name='mail' className='text-primary' />
          </div>
          <div>
            <p className='text-xs text-earth/50 dark:text-slate-500 uppercase tracking-widest'>
              Email
            </p>
            <p className='text-sm font-bold text-earth dark:text-white'>investors@logistics.com</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
            <Icon name='phone' className='text-primary' />
          </div>
          <div>
            <p className='text-xs text-earth/50 dark:text-slate-500 uppercase tracking-widest'>
              Phone
            </p>
            <p className='text-sm font-bold text-earth dark:text-white'>+55 (11) 3000-0000</p>
          </div>
        </div>
      </div>
      <Button
        variant='whatsapp'
        className='w-full mt-6'
        icon={<Icon name='chat' />}
        iconPosition='left'
      >
        WhatsApp Direct
      </Button>
    </Card>
  )
}
