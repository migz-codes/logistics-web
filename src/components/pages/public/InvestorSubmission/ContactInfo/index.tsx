import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

export function ContactInfo() {
  return (
    <Card className='bg-gradient-to-br from-primary/5 to-secondary/5 border-primary-500/10'>
      <h3 className='text-lg font-bold text-neutral-600 mb-6'>Need Assistance?</h3>
      <div className='space-y-4'>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center'>
            <Icon name='mail' className='text-primary-500' />
          </div>
          <div>
            <p className='text-xs text-neutral-600/50 uppercase tracking-widest'>Email</p>
            <p className='text-sm font-bold text-neutral-600'>investors@logistics.com</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center'>
            <Icon name='phone' className='text-primary-500' />
          </div>
          <div>
            <p className='text-xs text-neutral-600/50 uppercase tracking-widest'>Phone</p>
            <p className='text-sm font-bold text-neutral-600'>+55 (11) 3000-0000</p>
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
