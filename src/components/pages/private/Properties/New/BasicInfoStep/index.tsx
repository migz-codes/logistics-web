'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Field, type FieldProps } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Label } from '@/components/shared/ui/Label'
import { Select } from '@/components/shared/ui/Select'
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

interface BasicInfoStepProps {
  formData: IWarehouseFormData
  onNext: (data: Partial<IWarehouseFormData>) => void
}

const basicInfoSchema = z.object({
  zip_code: z.string().optional(),
  area: z.string().min(1, 'Area is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  price: z.string().min(1, 'Price is required'),
  status: z.string().min(1, 'Status is required'),
  address: z.string().min(1, 'Address is required'),
  country: z.string().min(1, 'Country is required'),
  category: z.string().min(1, 'Category is required'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000)
})

type FormData = z.infer<typeof basicInfoSchema>

interface CEPData {
  logradouro: string
  localidade: string
  uf: string
}

export function BasicInfoStep({ formData, onNext }: BasicInfoStepProps) {
  const t = useTranslations('warehouseEditor')

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      area: formData.area,
      city: formData.city,
      state: formData.state,
      title: formData.title,
      price: formData.price,
      status: formData.status,
      address: formData.address,
      country: formData.country,
      zip_code: formData.zip_code,
      category: formData.category,
      description: formData.description
    }
  })

  const categoryOptions = [
    { value: '', label: t('form.selectCategory') },
    { value: 'warehouse', label: t('form.categories.warehouse') },
    { value: 'cold-storage', label: t('form.categories.coldStorage') },
    { value: 'cross-dock', label: t('form.categories.crossDock') },
    { value: 'distribution', label: t('form.categories.distribution') }
  ]

  const statusOptions = [
    { value: 'available', label: t('form.status.available') },
    { value: 'leased', label: t('form.status.leased') },
    { value: 'under-construction', label: t('form.status.underConstruction') },
    { value: 'maintenance', label: t('form.status.maintenance') }
  ]

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setValue('zip_code', value)

    if (value.length >= 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`)
        const data: CEPData = await response.json()

        if (data.logradouro) {
          setValue('address', data.logradouro)
          setValue('city', data.localidade)
          setValue('state', data.uf)
          setValue('country', 'Brazil')
        }
      } catch (error) {
        console.error('Error looking up CEP:', error)
      }
    }
  }

  const onSubmit = (data: FormData) => {
    onNext(data)
  }

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-neutral-600 mb-8 flex items-center gap-3'>
        <Icon name='info' className='text-primary-500' />
        {t('basicInfo.title')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Field
            name='title'
            register={register}
            label={t('form.title')}
            errorMessage={errors.title?.message}
            tws={fieldTw(!!errors.title?.message)}
          />

          <Label label={t('form.category')} error={errors.category?.message}>
            <Select
              options={categoryOptions}
              value={watch('category')}
              {...register('category')}
              error={errors.category?.message}
            />
          </Label>
        </div>

        <Label label={t('form.description')} error={errors.description?.message}>
          <Textarea
            rows={3}
            placeholder={t('form.descriptionPlaceholder')}
            {...register('description')}
            error={errors.description?.message}
          />
        </Label>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Label label={t('form.area')} error={errors.area?.message}>
            <Input {...register('area')} placeholder='e.g., 5000' error={errors.area?.message} />
          </Label>

          <Label label={t('form.price')} error={errors.price?.message}>
            <Input placeholder='e.g., 25.00' {...register('price')} error={errors.price?.message} />
          </Label>

          <Label label={t('form.statusLabel')} error={errors.status?.message}>
            <Select
              options={statusOptions}
              value={watch('status')}
              {...register('status')}
              error={errors.status?.message}
            />
          </Label>
        </div>

        <div className='border-t border-primary-500/5 pt-6'>
          <h3 className='text-lg font-bold text-neutral-600 mb-4 flex items-center gap-2'>
            <Icon name='location_on' className='text-primary-500' />
            {t('form.addressSection')}
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Label label={t('form.zipCode')}>
              <Input
                placeholder='e.g., 01310-100'
                value={watch('zip_code')}
                onChange={handleCEPChange}
              />
            </Label>

            <Label label={t('form.country')} error={errors.country?.message}>
              <Input
                placeholder='e.g., Brazil'
                {...register('country')}
                error={errors.country?.message}
              />
            </Label>

            <Label label={t('form.state')} error={errors.state?.message}>
              <Input placeholder='e.g., SP' {...register('state')} error={errors.state?.message} />
            </Label>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <Label label={t('form.city')} error={errors.city?.message}>
              <Input
                placeholder='e.g., São Paulo'
                {...register('city')}
                error={errors.city?.message}
              />
            </Label>

            <Label label={t('form.address')} error={errors.address?.message}>
              <Input
                placeholder={t('form.addressPlaceholder')}
                {...register('address')}
                error={errors.address?.message}
              />
            </Label>
          </div>
        </div>
      </form>

      <div className='flex justify-end pt-6 border-t border-primary-500/5 mt-6'>
        <Button
          type='button'
          variant='primary'
          onClick={handleSubmit(onSubmit)}
          icon={<Icon name='arrow_forward' />}
        >
          {t('form.nextButton')}
        </Button>
      </div>
    </Card>
  )
}
