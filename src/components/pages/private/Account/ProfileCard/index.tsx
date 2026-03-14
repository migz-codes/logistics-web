'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Field } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_ME_QUERY,
  type GetMeResponse,
  UPDATE_PROFILE_MUTATION,
  type UpdateProfileResponse
} from '@/lib/apollo/mutations/user'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'
import { type ProfileFormData, profileSchema } from './schema'

export function ProfileCard() {
  const t = useTranslations('account')
  const tAuth = useTranslations('auth')

  const setUser = useSetAtom(userAtoms.user)

  const { data: userData } = useQuery<GetMeResponse>(GET_ME_QUERY)
  const [updateProfile] = useMutation<UpdateProfileResponse>(UPDATE_PROFILE_MUTATION)

  const { register, setValue, handleSubmit, formState } = useForm<ProfileFormData>({
    values: { name: '', email: '' },
    resolver: zodResolver(profileSchema)
  })

  const onSubmit = async (data: ProfileFormData) => {
    if (!userData?.getMe) return

    try {
      const { data: response } = await updateProfile({
        variables: { input: { name: data.name, email: data.email } }
      })

      const user = userData?.getMe

      if (response?.updateProfile && user)
        setUser({
          role: user.role,
          updated_at: user.updated_at,
          created_at: user.created_at,
          id: response.updateProfile.id,
          name: response.updateProfile.name,
          email: response.updateProfile.email
        })

      toast.success(t('profileUpdated'))
    } catch {
      toast.error(t('profileUpdateError'))
    }
  }

  useEffect(() => {
    if (!userData?.getMe) return

    setValue('name', userData.getMe.name)
    setValue('email', userData.getMe.email)

    setUser({
      id: userData.getMe.id,
      role: userData.getMe.role,
      name: userData.getMe.name,
      email: userData.getMe.email,
      created_at: userData.getMe.created_at,
      updated_at: userData.getMe.updated_at
    })
  }, [userData, setValue, setUser])

  return (
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

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-1 flex-col gap-y-4'>
        <Field
          name='name'
          type='text'
          leftIcon='person'
          register={register}
          label={t('profile.name')}
          placeholder={tAuth('fullNamePlaceholder')}
          errorMessage={
            formState.errors.name?.message ? tAuth(formState.errors.name.message) : undefined
          }
        />

        <Field
          name='email'
          type='email'
          leftIcon='email'
          register={register}
          label={t('profile.email')}
          placeholder={tAuth('emailPlaceholder')}
          errorMessage={
            formState.errors.email?.message ? tAuth(formState.errors.email.message) : undefined
          }
        />

        <Button
          size='md'
          type='submit'
          variant='primary'
          className='w-full mt-auto'
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? t('saving') : t('saveProfile')}
        </Button>
      </form>
    </Card>
  )
}
