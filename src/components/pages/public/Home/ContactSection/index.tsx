'use client'

import { useTranslations } from 'next-intl'
import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Textarea } from '@/components/shared/ui/Textarea'

export function ContactSection() {
  const t = useTranslations('home.contact')

  return (
    <section className='py-32 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          {/* Contact Form */}
          <Card variant='elevated'>
            <Badge variant='primary' className='mb-6'>
              {t('badge')}
            </Badge>
            <h2 className='text-4xl font-extrabold text-earth mb-8'>
              {t('title')}{' '}
              <span className='text-secondary italic font-light'>{t('conversationHighlight')}</span>
            </h2>

            <form className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <Input label={t('form.firstName')} placeholder={t('form.firstNamePlaceholder')} />
                <Input label={t('form.lastName')} placeholder={t('form.lastNamePlaceholder')} />
              </div>
              <Input
                label={t('form.email')}
                placeholder={t('form.emailPlaceholder')}
                type='email'
              />
              <Input label={t('form.phone')} placeholder={t('form.phonePlaceholder')} type='tel' />
              <Textarea
                label={t('form.message')}
                placeholder={t('form.messagePlaceholder')}
                rows={4}
              />

              <Button variant='primary' size='lg' icon={<Icon name='send' />} className='w-full'>
                {t('form.sendButton')}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-3xl font-bold text-earth mb-4'>{t('info.title')}</h3>
              <p className='text-earth/60 leading-relaxed'>{t('info.description')}</p>
            </div>

            <div className='space-y-6'>
              {[
                {
                  icon: 'location_on',
                  label: t('info.office.label'),
                  value: t('info.office.value'),
                  sublabel: t('info.office.sublabel')
                },
                {
                  icon: 'phone',
                  label: t('info.phone.label'),
                  value: t('info.phone.value'),
                  sublabel: t('info.phone.sublabel')
                },
                {
                  icon: 'mail',
                  label: t('info.email.label'),
                  value: t('info.email.value'),
                  sublabel: t('info.email.sublabel')
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
                <h4 className='text-xl font-bold text-earth'>{t('whatsapp.title')}</h4>
              </div>
              <p className='text-earth/60 mb-6'>{t('whatsapp.description')}</p>
              <Button variant='whatsapp' icon={<Icon name='arrow_forward' />}>
                {t('whatsapp.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
