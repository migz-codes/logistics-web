'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCallback, useRef, useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface MediaStepProps {
  images: File[]
  onNext: (images: File[]) => void
  onPrevious: () => void
}

export function MediaStep({ images: initialImages, onNext, onPrevious }: MediaStepProps) {
  const t = useTranslations('warehouseEditor')
  const [images, setImages] = useState<File[]>(initialImages)
  const [previews, setPreviews] = useState<string[]>(() =>
    initialImages.map((file) => URL.createObjectURL(file))
  )
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return

    const validFiles = Array.from(files).filter(
      (file) => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    )

    if (validFiles.length === 0) return

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))

    setImages((prev) => [...prev, ...validFiles])
    setPreviews((prev) => [...prev, ...newPreviews])
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previews[index])
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    onNext(images)
  }

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-neutral-600 mb-8 flex items-center gap-3'>
        <Icon name='image' className='text-primary-500' />
        {t('media.title')}
      </h2>

      <div className='space-y-8'>
        {/* Upload Area */}
        <div>
          <h3 className='text-sm font-bold text-primary-500 uppercase tracking-widest mb-4'>
            {t('media.uploadPhotos')}
          </h3>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className='sr-only'
          />
          <button
            type='button'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative w-full border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer bg-surface-200 ${
              isDragging
                ? 'border-primary-500 bg-primary-500/5'
                : 'border-primary-500/20 hover:border-primary-500/40'
            }`}
          >
            <div className='w-16 h-16 mx-auto bg-primary-500/10 rounded-2xl flex items-center justify-center mb-4'>
              <Icon name='cloud_upload' className='text-primary-500' size='xl' />
            </div>

            <p className='font-bold text-neutral-600 mb-2'>{t('media.dragDrop')}</p>
            <p className='text-sm text-neutral-600/60 mb-4'>{t('media.fileTypes')}</p>

            <span className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-primary-500/20 rounded-lg text-primary-500 pointer-events-none'>
              {t('media.browseFiles')}
            </span>
          </button>
        </div>

        {/* Image Previews */}
        {previews.length > 0 && (
          <div>
            <h3 className='text-sm font-bold text-primary-500 uppercase tracking-widest mb-4'>
              {t('media.uploadedPhotos')} ({previews.length})
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {previews.map((preview, index) => (
                <div key={preview} className='relative group aspect-video'>
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className='object-cover rounded-xl'
                    unoptimized
                  />
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveImage(index)
                    }}
                    className='absolute top-2 right-2 w-8 h-8 bg-error-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <Icon name='close' size='sm' />
                  </button>
                  {index === 0 && (
                    <span className='absolute bottom-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-lg'>
                      {t('media.mainPhoto')}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className='text-xs text-neutral-600/50 mt-3'>{t('media.firstPhotoMain')}</p>
          </div>
        )}

        <div className='flex justify-between pt-6 border-t border-primary-500/5'>
          <Button
            variant='outline'
            icon={<Icon name='arrow_back' />}
            iconPosition='left'
            onClick={onPrevious}
            type='button'
          >
            {t('form.previousButton')}
          </Button>

          <Button
            variant='primary'
            icon={<Icon name='arrow_forward' />}
            onClick={handleNext}
            type='button'
          >
            {t('form.nextButton')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
