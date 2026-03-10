'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import type { FieldProps } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Label } from '@/components/shared/ui/Label'
import { Textarea } from '@/components/shared/ui/Textarea'
import { tw } from '@/utils/tailwind'
import type { IWarehouseFormData } from '../index'

const fieldTw: (hasError: boolean) => FieldProps['tws'] = (hasError) => ({
  label: 'block text-xs font-black text-neutral-600/50 uppercase tracking-widest',
  input: tw(
    'w-full rounded-xl bg-surface-200 border-none text-neutral-600 font-medium placeholder-neutral-600/40 h-[54px]',
    hasError ? 'ring-2 ring-error-500' : 'focus:ring-2 focus:ring-primary-500'
  )
})

const addressSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zip_code: z.string().min(1, 'Zip code is required')
})

type FormData = z.infer<typeof addressSchema>

interface AddressStepProps {
  formData: IWarehouseFormData
  onNext: (data: Partial<IWarehouseFormData>) => void
  onBack: () => void
}

export function AddressStep({ formData, onNext, onBack }: AddressStepProps) {
  const t = useTranslations('warehouseEditor')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: formData.city,
      state: formData.state,
      address: formData.address,
      country: formData.country,
      zip_code: formData.zip_code
    }
  })

  const onSubmit = (data: FormData) => {
    onNext(data)
  }

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-neutral-600 mb-8 flex items-center gap-3'>
        <Icon name='location_on' className='text-primary-500' />
        {t('steps.address')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Label label={t('form.zipCode')} error={errors.zip_code?.message}>
            <Input
              placeholder='e.g., 01310-100'
              {...register('zip_code')}
              error={errors.zip_code?.message}
            />
          </Label>

          <Label label={t('form.city')} error={errors.city?.message}>
            <Input
              placeholder='e.g., São Paulo'
              {...register('city')}
              error={errors.city?.message}
            />
          </Label>
        </div>

        <Label label={t('form.address')} error={errors.address?.message}>
          <Textarea
            rows={2}
            placeholder='e.g., Avenida Paulista, 1000'
            {...register('address')}
            error={errors.address?.message}
          />
        </Label>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Label label={t('form.state')} error={errors.state?.message}>
            <Input placeholder='e.g., SP' {...register('state')} error={errors.state?.message} />
          </Label>

          <Label label={t('form.country')} error={errors.country?.message}>
            <Input
              placeholder='e.g., Brasil'
              {...register('country')}
              error={errors.country?.message}
            />
          </Label>
        </div>

        <div className='flex justify-between pt-6 border-t border-primary-500/5 mt-6'>
          <Button type='button' variant='outline' onClick={onBack} className='px-8'>
            {t('common.back')}
          </Button>

          <Button type='submit' className='px-8'>
            {t('common.next')}
          </Button>
        </div>
      </form>
    </Card>
  )
}
