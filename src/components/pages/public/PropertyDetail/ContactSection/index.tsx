import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Textarea } from '@/components/shared/ui/Textarea'

export function ContactSection() {
  return (
    <section className='bg-cream py-24 border-t border-primary/5' id='contact'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-12 items-start'>
          {/* Contact Form */}
          <Card variant='elevated' padding='lg'>
            <h2 className='text-3xl font-bold text-earth mb-2'>Get in Touch</h2>
            <p className='text-earth/60 mb-8'>
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
              <h3 className='text-2xl font-bold text-earth mb-6'>Contact Information</h3>
              <div className='space-y-8'>
                {/* Location */}
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl text-primary'>
                    <Icon name='location_on' />
                  </div>
                  <div>
                    <h4 className='font-bold text-earth'>Headquarters</h4>
                    <p className='text-earth/60 text-sm leading-relaxed'>
                      Av. Brigadeiro Faria Lima, 4500 - 15th Floor
                      <br />
                      Itaim Bibi, São Paulo - SP, 04538-132
                    </p>
                  </div>
                </div>

                {/* License */}
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl text-primary'>
                    <Icon name='badge' />
                  </div>
                  <div>
                    <h4 className='font-bold text-earth'>Broker Certification</h4>
                    <p className='text-earth/60 text-sm'>Official Commercial Real Estate License</p>
                    <p className='text-primary font-mono text-sm font-bold bg-primary/5 px-3 py-1 rounded inline-block mt-2 border border-primary/10'>
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
