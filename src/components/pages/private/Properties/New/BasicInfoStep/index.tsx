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
  onBack?: () => void
}

export function BasicInfoStep({ formData, onNext, onBack }: BasicInfoStepProps) {
  const t = useTranslations('warehouseEditor')

  const basicInfoSchema = z.object({
    area_total: z.string().min(1, t('form.errors.areaRequired')),
    price: z.string().min(1, t('form.errors.priceRequired')),
    title: z.string().min(3, t('form.errors.titleMin')).max(100, t('form.errors.titleMax')),
    description: z.string().max(500, t('form.errors.descriptionMax')).optional()
  })

  type FormData = z.infer<typeof basicInfoSchema>

  const [statusValue, setStatusValue] = useState<'AVAILABLE' | 'UNAVAILABLE'>(
    formData.status || 'AVAILABLE'
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      area_total: formData.area_total,
      title: formData.title,
      price: formData.price,
      description: formData.description
    }
  })

  const statusOptions = [
    { value: 'AVAILABLE', label: t('form.status.available') },
    { value: 'UNAVAILABLE', label: t('form.status.unavailable') }
  ]

  const onSubmit = (data: FormData) => {
    onNext({ ...data, status: statusValue })
  }

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-neutral-600 mb-8 flex items-center gap-3'>
        <Icon name='info' className='text-primary-500' />
        {t('basicInfo.title')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <Field
          name='title'
          register={register}
          label={t('form.title')}
          errorMessage={errors.title?.message}
        />

        <FieldTextarea
          rows={3}
          name='description'
          register={register}
          label={t('form.description')}
          errorMessage={errors.description?.message}
        />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Field
            name='area_total'
            register={register}
            label={t('form.area')}
            errorMessage={errors.area_total?.message}
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
              value={statusOptions.find((opt) => opt.value === statusValue)}
              onChange={(option: any) => setStatusValue(option?.value || 'AVAILABLE')}
            />
          </Label>
        </div>
      </form>

      <div className='flex justify-between pt-6 border-t border-primary-500/5 mt-6'>
        {onBack ? (
          <Button type='button' variant='secondary' onClick={onBack}>
            <Icon name='arrow_back' size='sm' />
            {t('form.backButton')}
          </Button>
        ) : (
          <div />
        )}

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
