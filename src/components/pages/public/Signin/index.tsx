'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { getSupabaseClient } from '@/services/supabase/client'

export default function AdminSigninPage() {
  const t = useTranslations('auth')
  const supabase = getSupabaseClient()

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signInWithEmail = async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (!error) router.push('/admin/dashboard')
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)

    console.log('Signing in with:', { email, password })

    if (!email || !password) return setIsLoading(false)

    await signInWithEmail({ email, password })

    setIsLoading(false)
  }

  return (
    <div className='min-h-screen bg-surface-200 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Logo/Brand Section */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <Icon name='admin_panel_settings' className='text-white' size='xl' />
          </div>
          <h1 className='text-2xl font-black text-neutral-600 mb-2'>{t('adminPortal')}</h1>
          <p className='text-sm text-neutral-600/60'>{t('signinDescription')}</p>
        </div>

        {/* Sign In Form */}
        <Card variant='elevated'>
          <form onSubmit={onSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-bold text-neutral-600 mb-2'>
                {t('emailAddress')}
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Icon name='email' className='text-neutral-600/40' size='sm' />
                </div>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary-500/10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm'
                  placeholder={t('emailPlaceholder')}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-bold text-neutral-600 mb-2'>
                {t('password')}
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Icon name='lock' className='text-neutral-600/40' size='sm' />
                </div>
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary-500/10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm'
                  placeholder={t('passwordPlaceholder')}
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  className='w-4 h-4 rounded text-primary-500 focus:ring-primary-500 border-primary-500/20'
                />
                <span className='text-sm text-neutral-600/60'>{t('rememberMe')}</span>
              </label>
              <Link
                href='/admin/forgot-password'
                className='text-sm font-bold text-primary-500 hover:underline'
              >
                {t('forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              variant='primary'
              size='md'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? t('signingIn') : t('signin')}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-neutral-600/60'>
              {t('noAccount')}{' '}
              <Link href='/signup' className='text-primary-500 hover:underline font-bold'>
                {t('signup')}
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className='mt-4 text-center'>
            <Link
              href='/'
              className='text-sm text-neutral-600/60 hover:text-primary-500 transition-colors inline-flex items-center gap-2'
            >
              <Icon name='arrow_back' size='sm' />
              {t('backToWebsite')}
            </Link>
          </div>
        </Card>

        {/* Security Notice */}
        <div className='mt-8 text-center'>
          <p className='text-xs text-neutral-600/40'>{t('securityNotice')}</p>
        </div>
      </div>
    </div>
  )
}
