'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Field } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_ME_QUERY,
  type GetMeResponse,
  UPDATE_PASSWORD_MUTATION,
  UPDATE_PROFILE_MUTATION,
  type UpdatePasswordResponse,
  type UpdateProfileResponse
} from '@/lib/apollo'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'
import {
  type PasswordFormData,
  type ProfileFormData,
  passwordSchema,
  profileSchema
} from './schema'

export function AccountPage() {
  const t = useTranslations('account')
  const tAuth = useTranslations('auth')
  const [user, setUser] = useAtom(userAtoms.user)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { data: userData } = useQuery<GetMeResponse>(GET_ME_QUERY)

  const [updateProfile] = useMutation<UpdateProfileResponse>(UPDATE_PROFILE_MUTATION)
  const [updatePassword] = useMutation<UpdatePasswordResponse>(UPDATE_PASSWORD_MUTATION)

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: userData?.getMe
      ? { name: userData.getMe.name, email: userData.getMe.email }
      : { name: '', email: '' }
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
  })

  useEffect(() => {
    if (userData?.getMe) {
      const fetchedUser = userData.getMe
      setUser({ id: fetchedUser.id, name: fetchedUser.name, email: fetchedUser.email })
    }
  }, [userData, setUser])

  const onProfileSubmit = async (data: ProfileFormData) => {
    if (!user) return

    try {
      const { data: response } = await updateProfile({
        variables: { userId: user.id, input: { name: data.name, email: data.email } }
      })

      if (response?.updateProfile) {
        setUser({
          id: response.updateProfile.id,
          name: response.updateProfile.name,
          email: response.updateProfile.email
        })
      }

      toast.success(t('profileUpdated'))
    } catch {
      toast.error(t('profileUpdateError'))
    }
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (!user) return

    try {
      await updatePassword({
        variables: {
          userId: user.id,
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
    <>
      <div className='mb-8'>
        <h1 className='text-2xl font-black text-neutral-600'>{t('title')}</h1>
        <p className='text-sm text-neutral-600/60 mt-1'>{t('subtitle')}</p>
      </div>

      <div className='grid lg:grid-cols-2 gap-8'>
        <Card variant='elevated' className='flex flex-col'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center'>
              <Icon name='person' className='text-primary-500' size='lg' />
            </div>
            <div>
              <h2 className='text-lg font-bold text-neutral-600'>{t('profile.title')}</h2>
              <p className='text-sm text-neutral-600/60'>{t('profile.subtitle')}</p>
            </div>
          </div>

          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className='flex flex-1 flex-col gap-y-4'
          >
            <Field
              name='name'
              register={registerProfile}
              label={t('profile.name')}
              type='text'
              placeholder={tAuth('fullNamePlaceholder')}
              leftIcon='person'
              errorMessage={
                profileErrors.name?.message ? tAuth(profileErrors.name.message) : undefined
              }
            />

            <Field
              name='email'
              register={registerProfile}
              label={t('profile.email')}
              type='email'
              placeholder={tAuth('emailPlaceholder')}
              leftIcon='email'
              errorMessage={
                profileErrors.email?.message ? tAuth(profileErrors.email.message) : undefined
              }
            />

            <Button
              type='submit'
              variant='primary'
              size='md'
              className='w-full mt-auto'
              disabled={isProfileSubmitting}
            >
              {isProfileSubmitting ? t('saving') : t('saveProfile')}
            </Button>
          </form>
        </Card>

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
              name='currentPassword'
              register={registerPassword}
              label={t('security.currentPassword')}
              type='password'
              placeholder={tAuth('passwordPlaceholder')}
              leftIcon='lock'
              showPassword={showCurrentPassword}
              onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
              errorMessage={
                passwordErrors.currentPassword?.message
                  ? tAuth(passwordErrors.currentPassword.message)
                  : undefined
              }
            />

            <Field
              name='newPassword'
              register={registerPassword}
              label={t('security.newPassword')}
              type='password'
              placeholder={tAuth('createPasswordPlaceholder')}
              leftIcon='lock'
              showPassword={showNewPassword}
              onTogglePassword={() => setShowNewPassword(!showNewPassword)}
              errorMessage={
                passwordErrors.newPassword?.message
                  ? tAuth(passwordErrors.newPassword.message)
                  : undefined
              }
            />

            <Field
              name='confirmPassword'
              register={registerPassword}
              label={tAuth('confirmPassword')}
              type='password'
              placeholder={tAuth('confirmPasswordPlaceholder')}
              leftIcon='lock'
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              errorMessage={
                passwordErrors.confirmPassword?.message
                  ? tAuth(passwordErrors.confirmPassword.message)
                  : undefined
              }
            />

            <Button
              type='submit'
              variant='primary'
              size='md'
              className='w-full mt-auto'
              disabled={isPasswordSubmitting}
            >
              {isPasswordSubmitting ? t('saving') : t('updatePassword')}
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}
