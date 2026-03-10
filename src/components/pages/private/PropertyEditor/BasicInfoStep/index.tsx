'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Label } from '@/components/shared/ui/Label'
import { Select } from '@/components/shared/ui/Select'
import { Textarea } from '@/components/shared/ui/Textarea'
import type { IWarehouseFormData } from '../index'

interface BasicInfoStepProps {
  formData: IWarehouseFormData
  onNext: (data: Partial<IWarehouseFormData>) => void
}

const basicInfoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  category: z.string().min(1, 'Category is required'),
  area: z.string().min(1, 'Area is required'),
  price: z.string().min(1, 'Price is required'),
  status: z.string().min(1, 'Status is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zip_code: z.string().optional()
})

type FormData = z.infer<typeof basicInfoSchema>

interface CEPData {
  logradouro: string
  localidade: string
  uf: string
}

export function BasicInfoStep({ formData, onNext }: BasicInfoStepProps) {
  const t = useTranslations('warehouseEditor')

  const { setValue, register, handleSubmit, formState, watch } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      area: formData.area,
      price: formData.price,
      status: formData.status,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zip_code: formData.zip_code
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
          <Label error={formState.errors.title?.message} label={t('form.title')}>
            <Input
              placeholder={t('form.titlePlaceholder')}
              {...register('title')}
              error={formState.errors.title?.message}
            />
          </Label>

          <Label label={t('form.category')} error={formState.errors.category?.message}>
            <Select
              options={categoryOptions}
              value={watch('category')}
              {...register('category')}
              error={formState.errors.category?.message}
            />
          </Label>
        </div>

        <Label label={t('form.description')} error={formState.errors.description?.message}>
          <Textarea
            rows={3}
            placeholder={t('form.descriptionPlaceholder')}
            {...register('description')}
            error={formState.errors.description?.message}
          />
        </Label>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Label label={t('form.area')} error={formState.errors.area?.message}>
            <Input
              placeholder='e.g., 5000'
              {...register('area')}
              error={formState.errors.area?.message}
            />
          </Label>

          <Label label={t('form.price')} error={formState.errors.price?.message}>
            <Input
              placeholder='e.g., 25.00'
              {...register('price')}
              error={formState.errors.price?.message}
            />
          </Label>

          <Label label={t('form.statusLabel')} error={formState.errors.status?.message}>
            <Select
              options={statusOptions}
              value={watch('status')}
              {...register('status')}
              error={formState.errors.status?.message}
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

            <Label label={t('form.country')} error={formState.errors.country?.message}>
              <Input
                placeholder='e.g., Brazil'
                {...register('country')}
                error={formState.errors.country?.message}
              />
            </Label>

            <Label label={t('form.state')} error={formState.errors.state?.message}>
              <Input
                placeholder='e.g., SP'
                {...register('state')}
                error={formState.errors.state?.message}
              />
            </Label>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <Label label={t('form.city')} error={formState.errors.city?.message}>
              <Input
                placeholder='e.g., São Paulo'
                {...register('city')}
                error={formState.errors.city?.message}
              />
            </Label>

            <Label label={t('form.address')} error={formState.errors.address?.message}>
              <Input
                placeholder={t('form.addressPlaceholder')}
                {...register('address')}
                error={formState.errors.address?.message}
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
