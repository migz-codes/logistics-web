'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import type { IWarehouseEditFormData } from '../index'

interface EditReviewStepProps {
  loading: boolean
  onPrevious: () => void
  formData: IWarehouseEditFormData
  onSubmit: () => Promise<void>
}

export function EditReviewStep({ formData, loading, onPrevious, onSubmit }: EditReviewStepProps) {
  const t = useTranslations('warehouseEditor')
  const [confirmed, setConfirmed] = useState(false)

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      AVAILABLE: t('form.status.available'),
      UNAVAILABLE: t('form.status.unavailable')
    }

    return labels[status] || status
  }

  const handleSubmit = async () => {
    if (!confirmed) return
    await onSubmit()
  }

  return (
    <Card variant='elevated' className='max-w-full overflow-hidden w-full'>
      <h2 className='text-2xl font-bold text-neutral-600 mb-8 flex items-center gap-3'>
        <Icon name='check_circle' className='text-primary-500' />
        {t('review.title')}
      </h2>

      <div className='space-y-8 flex flex-col w-full overflow-hidden'>
        {/* Warehouse Preview */}
        <div className='bg-surface-200 rounded-2xl p-6'>
          <div className='flex items-start gap-6'>
            <div className='w-32 h-24 bg-primary-500/10 rounded-xl flex items-center justify-center'>
              <Icon name='warehouse' className='text-primary-500' size='xl' />
            </div>

            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 mb-2 flex-wrap'>
                <Badge variant={formData.status === 'AVAILABLE' ? 'success' : 'warning'}>
                  {getStatusLabel(formData.status)}
                </Badge>
              </div>
              <h3 className='text-xl font-bold text-neutral-600 truncate'>
                {formData.title || t('review.noTitle')}
              </h3>
              <p className='text-sm text-neutral-600/60 flex items-center gap-1 mt-1 truncate'>
                <Icon name='location_on' size='sm' className='flex-shrink-0' />
                <span className='truncate'>
                  {formData.address
                    ? `${formData.address}, ${formData.city}, ${formData.state}`
                    : t('review.noAddress')}
                </span>
              </p>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-black text-neutral-600'>R$ {formData.price || '--'}/m²</p>
              <p className='text-sm text-neutral-600/50'>{formData.area_total || '--'} m² total</p>
            </div>
          </div>
        </div>

        {/* Section Summaries */}
        <div className='grid md:grid-cols-2 gap-6'>
          {/* Basic Info */}
          <div className='bg-white rounded-2xl p-6 border border-primary-500/5'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='font-bold text-neutral-600 flex items-center gap-2'>
                <Icon name='info' className='text-primary-500' size='sm' />
                {t('review.basicInfo')}
              </h4>
            </div>
            <div className='space-y-2 text-sm text-neutral-600/60'>
              <p>
                <span className='font-medium text-neutral-600'>{t('form.statusLabel')}:</span>{' '}
                {getStatusLabel(formData.status)}
              </p>
              <p>
                <span className='font-medium text-neutral-600'>{t('form.area')}:</span>{' '}
                {formData.area_total} m²
              </p>
              <p>
                <span className='font-medium text-neutral-600'>{t('form.price')}:</span> R${' '}
                {formData.price}/m²
              </p>
            </div>
          </div>

          {/* Address */}
          <div className='bg-white rounded-2xl p-6 border border-primary-500/5'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='font-bold text-neutral-600 flex items-center gap-2'>
                <Icon name='location_on' className='text-primary-500' size='sm' />
                {t('form.addressSection')}
              </h4>
            </div>
            <div className='space-y-2 text-sm text-neutral-600/60'>
              <p>
                <span className='font-medium text-neutral-600'>{t('form.address')}:</span>{' '}
                {formData.address}
              </p>
              {formData.address_complement && (
                <p>
                  <span className='font-medium text-neutral-600'>
                    {t('form.addressComplement')}:
                  </span>{' '}
                  {formData.address_complement}
                </p>
              )}
              <p>
                <span className='font-medium text-neutral-600'>{t('form.city')}:</span>{' '}
                {formData.city}
              </p>
              <p>
                <span className='font-medium text-neutral-600'>{t('form.state')}:</span>{' '}
                {formData.state}
              </p>
              <p>
                <span className='font-medium text-neutral-600'>{t('form.country')}:</span>{' '}
                {formData.country}
              </p>
              {formData.zip_code && (
                <p>
                  <span className='font-medium text-neutral-600'>{t('form.zipCode')}:</span>{' '}
                  {formData.zip_code}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='bg-white rounded-2xl p-6 border border-primary-500/5 overflow-hidden w-full flex flex-col'>
          <h4 className='font-bold text-neutral-600 flex items-center gap-2 mb-4'>
            <Icon name='description' className='text-primary-500' size='sm' />
            {t('form.description')}
          </h4>

          <p className='text-sm text-neutral-600/60 break-words whitespace-pre-line break-all w-full'>
            {formData.description}
          </p>
        </div>

        {/* Terms Checkbox */}
        <label className='flex items-start gap-4 p-6 bg-primary-500/5 rounded-2xl border border-primary-500/10 cursor-pointer'>
          <input
            type='checkbox'
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className='w-5 h-5 rounded text-primary-500 focus:ring-primary-500 mt-0.5'
          />
          <div>
            <p className='font-bold text-neutral-600 mb-1'>{t('review.confirmUpdateTitle')}</p>
            <p className='text-sm text-neutral-600/60'>{t('review.confirmUpdateDescription')}</p>
          </div>
        </label>

        <div className='flex justify-between pt-6 border-t border-primary-500/5'>
          <Button
            variant='outline'
            icon={<Icon name='arrow_back' />}
            iconPosition='left'
            onClick={onPrevious}
            type='button'
            disabled={loading}
          >
            {t('form.previousButton')}
          </Button>

          <Button
            variant='primary'
            icon={<Icon name='save' />}
            onClick={handleSubmit}
            disabled={!confirmed || loading}
          >
            {loading ? t('review.updating') : t('review.updateButton')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
