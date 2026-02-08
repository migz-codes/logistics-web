'use client'

import { Button } from '@/components/shared/ui/Button'

export function HeroSection() {
  return (
    <header className='relative h-[90vh] w-full overflow-hidden'>
      <img
        alt='Vibrant neighborhood life'
        className='absolute inset-0 w-full h-full object-cover scale-105'
        src='https://lh3.googleusercontent.com/aida-public/AB6AXuDvGyGFgcHLM3-ftoekoKy2glBv00OtBj2STSGiqZWZjtFesJpDQU30Z5OWMvQXUcLXsJoZE89Xt2Iob-YZBONI3OWH1n4OpJlXnMT-LRl71wJzcEgysiXMYHXMBZaMAzfcNEiaSLaTNwGeOJWg6buJ_dxpkFQQS8xEEPO3cxH_w7C_vfdIouuVLv_-rFzyxDenO3zBa17B3jLTKJRfYMm8fHzHEwQQg1dOBXjNFdoRFn-1UwLo4ANs7S_Cxo4pMpvdkBOlmT9ZmiE'
      />
      <div className='absolute inset-0 lifestyle-gradient' />
      <div className='relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center'>
        <h1 className='text-6xl md:text-8xl font-extrabold text-earth dark:text-white leading-[1.05] mb-8 max-w-4xl'>
          DISCOVER YOUR IDEAL <br />
          <span className='text-secondary italic font-light'>PROPERTY</span>
        </h1>
        <p className='text-earth/80 dark:text-white/80 text-xl max-w-2xl mb-12 leading-relaxed font-medium'>
          We are dedicated to connecting buyers and sellers with the most desirable properties on
          the market. Our team of experienced real estate professionals.
        </p>
        <div className='flex flex-wrap justify-center gap-5'>
          <Button variant='earth' size='lg' className='shadow-2xl'>
            Buy
          </Button>
          <Button
            variant='outline'
            size='lg'
            className='bg-white/90 backdrop-blur-md text-earth border border-earth/10 hover:bg-white shadow-xl'
          >
            Sell
          </Button>
        </div>
      </div>
    </header>
  )
}
