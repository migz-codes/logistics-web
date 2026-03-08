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
import { Field } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import { REGISTER_MUTATION, type RegisterResponse } from '@/lib/apollo'
import { setAuthCookies } from '@/lib/auth'
import { toast } from '@/lib/toast'
import { type SignupFormData, signupSchema } from './schema'

export default function SignupPage() {
  const router = useRouter()
  const t = useTranslations('auth')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registerMutation] = useMutation<RegisterResponse>(REGISTER_MUTATION)

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', acceptTerms: false, confirmPassword: '' }
  })

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
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <Icon name='person_add' className='text-white' size='xl' />
          </div>

          <h1 className='text-2xl font-black text-neutral-600 mb-2'>{t('createAccount')}</h1>

          <p className='text-sm text-neutral-600/60'>{t('joinPlatform')}</p>
        </div>

        <Card variant='elevated'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <Field
              name='name'
              register={registerField}
              label={t('fullName')}
              type='text'
              placeholder={t('fullNamePlaceholder')}
              leftIcon='person'
              errorMessage={errors.name?.message ? t(errors.name.message) : undefined}
            />

            <Field
              name='email'
              register={registerField}
              label={t('emailAddress')}
              type='email'
              placeholder={t('emailPlaceholder')}
              leftIcon='email'
              errorMessage={errors.email?.message ? t(errors.email.message) : undefined}
            />

            <Field
              name='password'
              register={registerField}
              label={t('password')}
              type='password'
              placeholder={t('createPasswordPlaceholder')}
              leftIcon='lock'
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              errorMessage={errors.password?.message ? t(errors.password.message) : undefined}
            />

            <Field
              name='confirmPassword'
              register={registerField}
              label={t('confirmPassword')}
              type='password'
              placeholder={t('confirmPasswordPlaceholder')}
              leftIcon='lock'
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              errorMessage={
                errors.confirmPassword?.message ? t(errors.confirmPassword.message) : undefined
              }
            />

            <div className='flex items-start gap-2'>
              <input
                type='checkbox'
                {...registerField('acceptTerms')}
                className='w-4 h-4 rounded text-primary-500 focus:ring-primary-500 border-primary-500/20 mt-1'
              />

              <span className='text-sm text-neutral-600/60'>
                <span>{t('termsAgreement')} </span>

                <Link href='/terms' className='text-primary-500 hover:underline font-bold'>
                  {t('termsOfService')}
                </Link>

                <span>{t('and')} </span>

                <Link href='/privacy' className='text-primary-500 hover:underline font-bold'>
                  {t('privacyPolicy')}
                </Link>
              </span>
            </div>

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

          <div className='mt-6 text-center'>
            <p className='text-sm text-neutral-600/60'>
              {t('hasAccount')}{' '}
              <Link href='/signin' className='text-primary-500 hover:underline font-bold'>
                {t('signin')}
              </Link>
            </p>
          </div>

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

        <div className='mt-8 text-center'>
          <p className='text-xs text-neutral-600/40'>{t('secureInfo')}</p>
        </div>
      </div>
    </div>
  )
}
