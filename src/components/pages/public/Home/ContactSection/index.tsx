'use client'

import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Textarea } from '@/components/shared/ui/Textarea'

export function ContactSection() {
  return (
    <section className='py-32 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          {/* Contact Form */}
          <Card variant='elevated'>
            <Badge variant='primary' className='mb-6'>
              Get In Touch
            </Badge>
            <h2 className='text-4xl font-extrabold text-earth mb-8'>
              Let's Start a <span className='text-secondary italic font-light'>Conversation</span>
            </h2>

            <form className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <Input label='First Name' placeholder='John' />
                <Input label='Last Name' placeholder='Doe' />
              </div>
              <Input label='Email' placeholder='john@example.com' type='email' />
              <Input label='Phone' placeholder='+1 (555) 000-0000' type='tel' />
              <Textarea
                label='Message'
                placeholder='Tell us about your dream property...'
                rows={4}
              />

              <Button variant='primary' size='lg' icon={<Icon name='send' />} className='w-full'>
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-3xl font-bold text-earth mb-4'>We're Here to Help</h3>
              <p className='text-earth/60 leading-relaxed'>
                Have questions about buying, selling, or renting? Our team of experts is ready to
                assist you every step of the way.
              </p>
            </div>

            <div className='space-y-6'>
              {[
                {
                  icon: 'location_on',
                  label: 'Office',
                  value: '123 Real Estate Blvd, Suite 500',
                  sublabel: 'Miami, FL 33101'
                },
                {
                  icon: 'phone',
                  label: 'Phone',
                  value: '+1 (555) 123-4567',
                  sublabel: 'Mon-Fri 9AM-6PM'
                },
                {
                  icon: 'mail',
                  label: 'Email',
                  value: 'hello@realestate.com',
                  sublabel: 'We reply within 24hrs'
                }
              ].map((item, index) => (
                <div key={`${item.icon}-${index}`} className='flex items-start gap-5'>
                  <div className='w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0'>
                    <Icon name={item.icon} className='text-primary' size='lg' />
                  </div>
                  <div>
                    <p className='text-xs font-black text-earth/40 uppercase tracking-widest mb-1'>
                      {item.label}
                    </p>
                    <p className='text-lg font-bold text-earth'>{item.value}</p>
                    <p className='text-sm text-earth/50'>{item.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className='bg-[#25D366]/10 rounded-3xl p-8'>
              <div className='flex items-center gap-4 mb-4'>
                <Icon name='chat' className='text-[#25D366]' size='lg' />
                <h4 className='text-xl font-bold text-earth'>Prefer WhatsApp?</h4>
              </div>
              <p className='text-earth/60 mb-6'>
                Get instant replies to your property questions via WhatsApp.
              </p>
              <Button variant='whatsapp' icon={<Icon name='arrow_forward' />}>
                Chat Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
