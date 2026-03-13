'use client'

import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Field } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import { LOGIN_MUTATION, type LoginResponse } from '@/lib/apollo'
import { setAuthCookies } from '@/lib/auth'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'
import { type SigninFormData, signinSchema } from './schema'

export default function AdminSigninPage() {
  const router = useRouter()
  const t = useTranslations('auth')
  const [showPassword, setShowPassword] = useState(false)
  const [login] = useMutation<LoginResponse>(LOGIN_MUTATION)
  const setUser = useSetAtom(userAtoms.user)

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: SigninFormData) => {
    try {
      const { data: response } = await login({
        variables: { input: { email: data.email, password: data.password } }
      })

      if (response?.login) {
        await setAuthCookies({
          accessToken: response.login.accessToken,
          refreshToken: response.login.refreshToken
        })

        setUser({
          id: response.login.user.id,
          name: response.login.user.name,
          email: response.login.user.email,
          role: response.login.user.role as 'ADMIN' | 'INVESTOR_ADMIN',
          created_at: response.login.user.created_at,
          updated_at: response.login.user.updated_at
        })

        router.push('/admin/dashboard')
      }
    } catch {
      toast.error(t('loginError'))
    }
  }

  return (
    <div className='min-h-screen bg-surface-200 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <Icon name='admin_panel_settings' className='text-white' size='xl' />
          </div>

          <h1 className='text-2xl font-black text-neutral-600 mb-2'>{t('adminPortal')}</h1>

          <p className='text-sm text-neutral-600/60'>{t('signinDescription')}</p>
        </div>

        <Card variant='elevated'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
              placeholder={t('passwordPlaceholder')}
              leftIcon='lock'
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              errorMessage={errors.password?.message ? t(errors.password.message) : undefined}
            />

            <Button
              size='md'
              type='submit'
              variant='primary'
              className='w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? t('signingIn') : t('signin')}
            </Button>
          </form>

          <div className='flex items-center justify-center mt-4'>
            <Link
              href='/admin/forgot-password'
              className='text-sm font-bold text-primary-500 hover:underline'
            >
              {t('forgotPassword')}
            </Link>
          </div>

          <div className='mt-2 text-center'>
            <p className='text-sm text-neutral-600/60'>
              {t('noAccount')}{' '}
              <Link href='/signup' className='text-primary-500 hover:underline font-bold'>
                {t('signup')}
              </Link>
            </p>
          </div>

          <div className='mt-6 text-center'>
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
          <p className='text-xs text-neutral-600/40'>{t('securityNotice')}</p>
        </div>
      </div>
    </div>
  )
}
