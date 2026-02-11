'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { getSupabaseClient } from '@/services/supabase/client'

export default function SignupPage() {
  const supabase = getSupabaseClient()

  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const signUpNewUser = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })

    if (!error) router.push('/admin/dashboard')
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()

    if (password !== confirmPassword) return alert('Passwords do not match')
    if (!email || !password || !confirmPassword) return alert('Please fill in all fields')

    setIsLoading(true)

    await signUpNewUser(email, password)

    setIsLoading(false)
  }

  return (
    <div className='min-h-screen bg-cream flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Logo/Brand Section */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <Icon name='person_add' className='text-white' size='xl' />
          </div>
          <h1 className='text-2xl font-black text-earth mb-2'>Create Account</h1>
          <p className='text-sm text-earth/60'>Join our real estate platform</p>
        </div>

        {/* Sign Up Form */}
        <Card variant='elevated'>
          <form onSubmit={onSubmit} className='space-y-6'>
            {/* Name Field */}
            <div>
              <label htmlFor='name' className='block text-sm font-bold text-earth mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Icon name='person' className='text-earth/40' size='sm' />
                </div>
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary/10 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm'
                  placeholder='John Doe'
                  required
                />
              </div>
            </div>

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
                  placeholder='john@example.com'
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
                  placeholder='Create a strong password'
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-bold text-earth mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Icon name='lock' className='text-earth/40' size='sm' />
                </div>
                <input
                  id='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary/10 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm'
                  placeholder='Confirm your password'
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='flex items-start gap-2'>
              <input
                type='checkbox'
                className='w-4 h-4 rounded text-primary focus:ring-primary border-primary/20 mt-1'
                required
              />
              <span className='text-sm text-earth/60'>
                I agree to the{' '}
                <Link href='/terms' className='text-primary hover:underline font-bold'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='text-primary hover:underline font-bold'>
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              variant='primary'
              size='md'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-earth/60'>
              Already have an account?{' '}
              <Link href='/signin' className='text-primary hover:underline font-bold'>
                Sign in
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
            Your information is secure and will never be shared with third parties.
          </p>
        </div>
      </div>
    </div>
  )
}
