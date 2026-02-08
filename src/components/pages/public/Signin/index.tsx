'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

export default function AdminSigninPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement authentication logic
    console.log('Login attempt:', { email, password })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className='min-h-screen bg-cream flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Logo/Brand Section */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <Icon name='admin_panel_settings' className='text-white' size='xl' />
          </div>
          <h1 className='text-2xl font-black text-earth mb-2'>Admin Portal</h1>
          <p className='text-sm text-earth/60'>Sign in to access your dashboard</p>
        </div>

        {/* Sign In Form */}
        <Card variant='elevated'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-bold text-earth mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Icon name='email' className='text-earth/40' size='sm' />
                </div>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary/10 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm'
                  placeholder='admin@example.com'
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-bold text-earth mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Icon name='lock' className='text-earth/40' size='sm' />
                </div>
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary/10 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm'
                  placeholder='Enter your password'
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  className='w-4 h-4 rounded text-primary focus:ring-primary border-primary/20'
                />
                <span className='text-sm text-earth/60'>Remember me</span>
              </label>
              <Link
                href='/admin/forgot-password'
                className='text-sm font-bold text-primary hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              variant='primary'
              size='md'
              className='w-full'
              disabled={isLoading}
              icon={isLoading ? 'hourglass_empty' : 'login'}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-earth/60'>
              Don't have an account?{' '}
              <Link href='/signup' className='text-primary hover:underline font-bold'>
                Sign up
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className='mt-4 text-center'>
            <Link
              href='/'
              className='text-sm text-earth/60 hover:text-primary transition-colors inline-flex items-center gap-2'
            >
              <Icon name='arrow_back' size='sm' />
              Back to website
            </Link>
          </div>
        </Card>

        {/* Security Notice */}
        <div className='mt-8 text-center'>
          <p className='text-xs text-earth/40'>
            This is a restricted area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}
