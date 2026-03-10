'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Field } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_ME_QUERY,
  type GetMeResponse,
  UPDATE_PASSWORD_MUTATION,
  type UpdatePasswordResponse
} from '@/lib/apollo'
import { toast } from '@/lib/toast'
import { type PasswordFormData, passwordSchema } from '../ProfileCard/schema'

export function SecurityCard() {
  const t = useTranslations('account')
  const tAuth = useTranslations('auth')

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { data: userData } = useQuery<GetMeResponse>(GET_ME_QUERY)
  const [updatePassword] = useMutation<UpdatePasswordResponse>(UPDATE_PASSWORD_MUTATION)

  const {
    reset: resetPassword,
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting }
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
  })

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (!userData?.getMe) return

    try {
      await updatePassword({
        variables: {
          input: { currentPassword: data.currentPassword, newPassword: data.newPassword }
        }
      })

      toast.success(t('passwordUpdated'))
      resetPassword()
    } catch {
      toast.error(t('passwordUpdateError'))
    }
  }

  return (
    <Card variant='elevated'>
      <div className='flex items-center gap-4 mb-6'>
        <div className='w-12 h-12 bg-secondary-500/10 rounded-xl flex items-center justify-center'>
          <Icon name='lock' className='text-secondary-500' size='lg' />
        </div>

        <div>
          <h2 className='text-lg font-bold text-neutral-600'>{t('security.title')}</h2>
          <p className='text-sm text-neutral-600/60'>{t('security.subtitle')}</p>
        </div>
      </div>

      <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className='space-y-4'>
        <Field
          leftIcon='lock'
          type='password'
          name='currentPassword'
          register={registerPassword}
          showPassword={showCurrentPassword}
          label={t('security.currentPassword')}
          placeholder={tAuth('passwordPlaceholder')}
          onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
          errorMessage={
            passwordErrors.currentPassword?.message
              ? tAuth(passwordErrors.currentPassword.message)
              : undefined
          }
        />

        <Field
          leftIcon='lock'
          type='password'
          name='newPassword'
          register={registerPassword}
          showPassword={showNewPassword}
          label={t('security.newPassword')}
          placeholder={tAuth('createPasswordPlaceholder')}
          onTogglePassword={() => setShowNewPassword(!showNewPassword)}
          errorMessage={
            passwordErrors.newPassword?.message
              ? tAuth(passwordErrors.newPassword.message)
              : undefined
          }
        />

        <Field
          type='password'
          leftIcon='lock'
          name='confirmPassword'
          register={registerPassword}
          label={tAuth('confirmPassword')}
          showPassword={showConfirmPassword}
          placeholder={tAuth('confirmPasswordPlaceholder')}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          errorMessage={
            passwordErrors.confirmPassword?.message
              ? tAuth(passwordErrors.confirmPassword.message)
              : undefined
          }
        />

        <Button
          size='md'
          type='submit'
          variant='primary'
          className='w-full mt-[24px]'
          disabled={isPasswordSubmitting}
        >
          {isPasswordSubmitting ? t('saving') : t('updatePassword')}
        </Button>
      </form>
    </Card>
  )
}
