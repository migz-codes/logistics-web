'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Select } from '@/components/shared/ui/Form/Select'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Textarea } from '@/components/shared/ui/Textarea'
import { type TTranslation, useTranslation } from '@/hooks/useTranslation'
import { onCurrencyChange, onNumberChange } from '@/utils/inputs'

export interface IFormData {
  cep?: string
  city?: string
  state?: string
  country?: string
  category: string
  address?: string
  totalArea: string
  leasePrice: string
  description: string
  propertyName: string
}

interface BasicInfoStepProps {
  onNext: (data: IFormData) => void
}

const getBasicInfoSchema = (t: TTranslation) => {
  return z.object({
    cep: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    address: z.string().optional(),
    country: z.string().optional(),
    category: z.string().min(1, t('property.category.required')),
    totalArea: z.string().min(1, t('property.totalArea.required')),
    leasePrice: z.string().min(1, t('property.leasePrice.required')),
    propertyName: z.string().min(3, t('property.name.min')).max(100, t('property.name.max')),
    description: z
      .string()
      .min(10, t('property.description.min'))
      .max(1000, t('property.description.max'))
  })
}

const categoryOptions = [
  { value: '', label: 'Select Category' },
  { value: 'warehouse', label: 'Class A Warehouse' },
  { value: 'cold-storage', label: 'Cold Storage' },
  { value: 'cross-dock', label: 'Cross-Docking Hub' },
  { value: 'last-mile', label: 'Last-Mile Center' }
]

export function BasicInfoStep(_props: BasicInfoStepProps) {
  const { t } = useTranslation()

  const { setValue, register, handleSubmit, formState } = useForm<IFormData>({
    mode: 'onChange',
    resolver: zodResolver(getBasicInfoSchema(t))
  })

  const onSubmit = (_data: IFormData) => {}

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-earth mb-8 flex items-center gap-3'>
        <Icon name='info' className='text-primary' />
        {t('basicInfo.title')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <Input
          label={t('basicInfo.propertyName.label')}
          placeholder={t('basicInfo.propertyName.placeholder')}
          {...register('propertyName')}
          error={formState.errors.propertyName?.message}
        />

        {/* <Select
          options={categoryOptions}
          label={t('basicInfo.category.label')}
          {...register('category')}
          error={formState.errors.category?.message}
        /> */}

        <Select options={categoryOptions} custom={{ icon: <Icon name='info' /> }} />

        <Input
          label='Total Area (m²)'
          placeholder='e.g., 4.000'
          {...register('totalArea')}
          error={formState.errors.totalArea?.message}
          onChange={(e) => setValue('totalArea', onNumberChange(e))}
        />

        <Input
          label={t('basicInfo.leasePrice.label')}
          placeholder={t('basicInfo.leasePrice.placeholder')}
          {...register('leasePrice')}
          onChange={(e) => setValue('leasePrice', onCurrencyChange(e))}
          error={formState.errors.leasePrice?.message}
        />

        <Textarea
          rows={4}
          label={t('basicInfo.description.label')}
          placeholder={t('basicInfo.description.placeholder')}
          {...register('description')}
          error={formState.errors.description?.message}
        />
      </form>

      <div className='flex justify-end pt-6 border-t border-primary/5'>
        <Button
          type='button'
          variant='primary'
          onClick={handleSubmit(onSubmit)}
          icon={<Icon name='arrow_forward' />}
        >
          {t('basicInfo.nextButton')}
        </Button>
      </div>
    </Card>
  )
}
