'use client'

import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Tooltip } from '@/components/shared/ui/Tooltip'
import { REGISTER_MUTATION, type RegisterResponse } from '@/lib/apollo'
import { setAuthCookies } from '@/lib/auth'
import { toast } from '@/lib/toast'
import { type SignupFormData, signupSchema } from './schema'

export default function SignupPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  })

  const [registerMutation] = useMutation<RegisterResponse>(REGISTER_MUTATION)

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { data: response } = await registerMutation({
        variables: { input: { name: data.name, email: data.email, password: data.password } }
      })

      if (response?.register) {
        await setAuthCookies({
          accessToken: response.register.accessToken,
          refreshToken: response.register.refreshToken
        })
        router.push('/admin/dashboard')
      }
    } catch {
      toast.error(t('signupError'))
    }
  }

  return (
    <div className='min-h-screen bg-surface-200 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Logo/Brand Section */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <Icon name='person_add' className='text-white' size='xl' />
          </div>
          <h1 className='text-2xl font-black text-neutral-600 mb-2'>{t('createAccount')}</h1>
          <p className='text-sm text-neutral-600/60'>{t('joinPlatform')}</p>
        </div>

        {/* Sign Up Form */}
        <Card variant='elevated'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Name Field */}
            <div>
              <label htmlFor='name' className='block text-sm font-bold text-neutral-600 mb-2'>
                {t('fullName')}
              </label>

              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center'>
                  {errors.name ? (
                    <Tooltip content={t(errors.name.message as string)} side='top'>
                      <span>
                        <Icon name='warning' className='text-red-500 cursor-pointer' size='sm' />
                      </span>
                    </Tooltip>
                  ) : (
                    <Icon name='person' className='text-neutral-600/40' size='sm' />
                  )}
                </div>

                <input
                  id='name'
                  type='text'
                  {...registerField('name')}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white border transition-all text-sm ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-primary-500/10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'}`}
                  placeholder={t('fullNamePlaceholder')}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-bold text-neutral-600 mb-2'>
                {t('emailAddress')}
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center'>
                  {errors.email ? (
                    <Tooltip content={t(errors.email.message as string)} side='top'>
                      <span>
                        <Icon name='warning' className='text-red-500 cursor-pointer' size='sm' />
                      </span>
                    </Tooltip>
                  ) : (
                    <Icon name='email' className='text-neutral-600/40' size='sm' />
                  )}
                </div>
                <input
                  id='email'
                  type='email'
                  {...registerField('email')}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white border transition-all text-sm ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-primary-500/10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'}`}
                  placeholder={t('emailPlaceholder')}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-bold text-neutral-600 mb-2'>
                {t('password')}
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center'>
                  {errors.password ? (
                    <Tooltip content={t(errors.password.message as string)} side='top'>
                      <span>
                        <Icon name='warning' className='text-red-500 cursor-pointer' size='sm' />
                      </span>
                    </Tooltip>
                  ) : (
                    <Icon name='lock' className='text-neutral-600/40' size='sm' />
                  )}
                </div>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...registerField('password')}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white border transition-all text-sm ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-primary-500/10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'}`}
                  placeholder={t('createPasswordPlaceholder')}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                >
                  <Icon
                    name={showPassword ? 'visibility_off' : 'visibility'}
                    className='text-neutral-600/40 hover:text-neutral-600'
                    size='sm'
                  />
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-bold text-neutral-600 mb-2'
              >
                {t('confirmPassword')}
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center'>
                  {errors.confirmPassword ? (
                    <Tooltip content={t(errors.confirmPassword.message as string)} side='top'>
                      <span>
                        <Icon name='warning' className='text-red-500 cursor-pointer' size='sm' />
                      </span>
                    </Tooltip>
                  ) : (
                    <Icon name='lock' className='text-neutral-600/40' size='sm' />
                  )}
                </div>
                <input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...registerField('confirmPassword')}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white border transition-all text-sm ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-primary-500/10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'}`}
                  placeholder={t('confirmPasswordPlaceholder')}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                >
                  <Icon
                    name={showConfirmPassword ? 'visibility_off' : 'visibility'}
                    className='text-neutral-600/40 hover:text-neutral-600'
                    size='sm'
                  />
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='flex items-start gap-2'>
              <input
                type='checkbox'
                {...registerField('acceptTerms')}
                className='w-4 h-4 rounded text-primary-500 focus:ring-primary-500 border-primary-500/20 mt-1'
              />
              <span className='text-sm text-neutral-600/60'>
                {t('termsAgreement')}{' '}
                <Link href='/terms' className='text-primary-500 hover:underline font-bold'>
                  {t('termsOfService')}
                </Link>{' '}
                {t('and')}{' '}
                <Link href='/privacy' className='text-primary-500 hover:underline font-bold'>
                  {t('privacyPolicy')}
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              variant='primary'
              size='md'
              className='w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? t('creatingAccount') : t('createAccount')}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-neutral-600/60'>
              {t('hasAccount')}{' '}
              <Link href='/signin' className='text-primary-500 hover:underline font-bold'>
                {t('signin')}
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
          <p className='text-xs text-neutral-600/40'>{t('secureInfo')}</p>
        </div>
      </div>
    </div>
  )
}
