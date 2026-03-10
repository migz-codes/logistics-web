'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Field } from '@/components/shared/ui/Field'
import { FieldTextarea } from '@/components/shared/ui/FieldTextarea'
import { Select } from '@/components/shared/ui/Form/Select'
import { Icon } from '@/components/shared/ui/Icon'
import { Label } from '@/components/shared/ui/Label'
import type { IWarehouseFormData } from '../index'

interface BasicInfoStepProps {
  formData: IWarehouseFormData
  onNext: (data: Partial<IWarehouseFormData>) => void
}

const basicInfoSchema = z.object({
  area: z.string().min(1, 'Area is required'),
  price: z.string().min(1, 'Price is required'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(400, 'Description must be at least 400 characters').max(1000)
})

type FormData = z.infer<typeof basicInfoSchema>

export function BasicInfoStep({ formData, onNext }: BasicInfoStepProps) {
  const t = useTranslations('warehouseEditor')

  const [categoryValue, setCategoryValue] = useState(formData.category || '')
  const [statusValue, setStatusValue] = useState(formData.status || 'available')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      area: formData.area,
      title: formData.title,
      price: formData.price,
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

  const onSubmit = (data: FormData) => {
    onNext({ ...data, status: statusValue, category: categoryValue })
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
          />

          <Select
            label={t('form.category')}
            options={categoryOptions}
            errorMessage='true'
            value={categoryValue}
            onChange={(value) => setCategoryValue(value as string)}
          />
        </div>

        <FieldTextarea
          rows={3}
          name='description'
          register={register}
          label={t('form.description')}
          errorMessage={errors.description?.message}
        />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Field
            name='area'
            register={register}
            label={t('form.area')}
            errorMessage={errors.area?.message}
          />

          <Field
            name='price'
            register={register}
            label={t('form.price')}
            errorMessage={errors.price?.message}
          />

          <Label label={t('form.statusLabel')}>
            <Select
              options={statusOptions}
              value={statusValue}
              onChange={(value) => setStatusValue(value as string)}
            />
          </Label>
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
