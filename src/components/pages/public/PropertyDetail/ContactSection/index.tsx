import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Textarea } from '@/components/shared/ui/Textarea'

export function ContactSection() {
  return (
    <section className='bg-surface-200 py-24 border-t border-primary-500/5' id='contact'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-12 items-start'>
          {/* Contact Form */}
          <Card variant='elevated' padding='lg'>
            <h2 className='text-3xl font-bold text-neutral-600 mb-2'>Get in Touch</h2>
            <p className='text-neutral-600/60 mb-8'>
              Our specialized logistics team is ready to assist you with your property requirements.
            </p>
            <form className='space-y-6'>
              <Input label='Name' placeholder='Your Name' type='text' />
              <Input label='Email Address' placeholder='email@company.com' type='email' />
              <Textarea label='Message' placeholder='How can we help you?' rows={4} />
              <Button variant='primary' className='w-full py-4' icon={<Icon name='send' />}>
                Send Inquiry
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className='lg:pl-12 space-y-10 py-4'>
            <div>
              <h3 className='text-2xl font-bold text-neutral-600 mb-6'>Contact Information</h3>
              <div className='space-y-8'>
                {/* Location */}
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-primary-500/10 flex items-center justify-center rounded-2xl text-primary-500'>
                    <Icon name='location_on' />
                  </div>
                  <div>
                    <h4 className='font-bold text-neutral-600'>Headquarters</h4>
                    <p className='text-neutral-600/60 text-sm leading-relaxed'>
                      Av. Brigadeiro Faria Lima, 4500 - 15th Floor
                      <br />
                      Itaim Bibi, São Paulo - SP, 04538-132
                    </p>
                  </div>
                </div>

                {/* License */}
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-primary-500/10 flex items-center justify-center rounded-2xl text-primary-500'>
                    <Icon name='badge' />
                  </div>
                  <div>
                    <h4 className='font-bold text-neutral-600'>Broker Certification</h4>
                    <p className='text-neutral-600/60 text-sm'>Official Commercial Real Estate License</p>
                    <p className='text-primary-500 font-mono text-sm font-bold bg-primary-500/5 px-3 py-1 rounded inline-block mt-2 border border-primary-500/10'>
                      CRECI: 293146-F
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className='pt-6'>
                  <Button
                    variant='whatsapp'
                    size='lg'
                    className='hover:scale-105 transition-transform shadow-xl'
                    icon={<Icon name='chat' />}
                    iconPosition='left'
                  >
                    Instant WhatsApp Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
