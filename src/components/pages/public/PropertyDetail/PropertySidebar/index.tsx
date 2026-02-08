'use client'

import Image from 'next/image'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'

interface Highlight {
  icon: string
  label: string
}

const defaultHighlights: Highlight[] = [
  { icon: 'check_circle', label: '24/7 Gated Security & CCTV' },
  { icon: 'check_circle', label: 'Natural Lighting System' },
  { icon: 'check_circle', label: 'Mezzanine for Administrative Offices' }
]

interface PropertySidebarProps {
  price?: string
  priceUnit?: string
  brokerImage?: string
  brokerCreci?: string
  highlights?: Highlight[]
}

export function PropertySidebar({
  price = 'R$ 22,50/m²',
  priceUnit = '/ month',
  brokerImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvJ_REnb312jAZ6mh-boBX0u52yrVCRaoxZlgUQ5Kdh4PBsp962W9qxcmrsTJpzSXPWK7lqq8yf1QKiRgyleUGVdpphXKf8TNlGe1iGR8nhyyjeDe4b0w176068tpnm4TNzz_2Ck_npgIzDU9KKKZfUOxf-GgIBnY_GqSfaLli288f-9rd6oP7qxMPUtTD3C6UBDsYD0yiCveXXt-3DeS3ZgKK2XNU85Z2xsm-As7nJK5__lzYqETEox7v94tZejiEwo_pUWHCzN8',
  brokerCreci = 'CRECI: 293146-F',
  highlights = defaultHighlights
}: PropertySidebarProps) {
  return (
    <div className='sticky top-32 space-y-6'>
      {/* Pricing Card */}
      <Card variant='elevated' padding='lg'>
        <div className='mb-8'>
          <p className='text-sm font-bold text-primary/60 uppercase tracking-widest mb-1'>
            Lease Price
          </p>
          <div className='flex items-baseline gap-2'>
            <span className='text-4xl font-black text-earth'>{price}</span>
            <span className='text-earth/40 text-sm font-medium'>
              {priceUnit}
            </span>
          </div>
        </div>

        <div className='space-y-4'>
          <Button
            variant='whatsapp'
            className='w-full py-4'
            icon={<Icon name='chat' />}
            iconPosition='left'
          >
            Contact via WhatsApp
          </Button>

          <div className='pt-6 border-t border-earth/5'>
            <h4 className='font-bold text-earth mb-4'>Request More Info</h4>
            <form className='space-y-4'>
              <Input placeholder='Full Name' type='text' />
              <Input placeholder='Work Email' type='email' />
              <Input placeholder='Company Name' type='text' />
              <Button variant='earth' className='w-full py-3 text-sm'>
                Submit Request
              </Button>
            </form>
          </div>

          <Button
            variant='outline'
            className='w-full py-4 mt-4'
            icon={<Icon name='calendar_month' />}
            iconPosition='left'
          >
            Schedule a Technical Visit
          </Button>
        </div>

        {/* Broker Info */}
        <div className='mt-8 flex items-center justify-center gap-3'>
          <Image
            alt='Broker'
            className='w-10 h-10 rounded-full object-cover'
            src={brokerImage}
            width={40}
            height={40}
          />

          <div>
            <p className='text-xs font-bold text-earth'>Licensed Broker</p>
            <p className='text-[10px] text-earth/60'>{brokerCreci}</p>
          </div>
        </div>
      </Card>

      {/* Highlights Card */}
      <div className='bg-primary/5 rounded-[2rem] p-6 border border-primary/10'>
        <h5 className='font-bold text-sm mb-3'>Key Highlights</h5>
        <ul className='space-y-2'>
          {highlights.map((highlight, index) => (
            <li
              key={`${highlight.icon}-${index}`}
              className='flex items-center gap-2 text-xs text-earth/70'
            >
              <Icon name={highlight.icon} className='text-primary text-base' />
              {highlight.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
