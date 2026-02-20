'use client'

import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface MediaStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function MediaStep({ onNext, onPrevious }: MediaStepProps) {
  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-neutral-600 mb-8 flex items-center gap-3'>
        <Icon name='image' className='text-primary-500' />
        Media & Gallery
      </h2>

      <div className='space-y-8'>
        {/* Main Photo Upload */}
        <div>
          <h3 className='text-sm font-bold text-primary-500 uppercase tracking-widest mb-4'>
            Main Photo
          </h3>
          <div className='border-2 border-dashed border-primary-500/20 rounded-2xl p-12 text-center hover:border-primary-500/40 transition-colors cursor-pointer bg-surface-200'>
            <div className='w-16 h-16 mx-auto bg-primary-500/10 rounded-2xl flex items-center justify-center mb-4'>
              <Icon name='cloud_upload' className='text-primary-500' size='xl' />
            </div>
            <p className='font-bold text-neutral-600 mb-2'>Drag & drop your main photo here</p>
            <p className='text-sm text-neutral-600/60 mb-4'>
              or click to browse files (JPG, PNG up to 10MB)
            </p>
            <Button variant='outline' size='sm'>
              Browse Files
            </Button>
          </div>
        </div>

        {/* Gallery Upload */}
        <div>
          <h3 className='text-sm font-bold text-primary-500 uppercase tracking-widest mb-4'>
            Gallery Photos
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className='aspect-video border-2 border-dashed border-primary-500/20 rounded-xl flex items-center justify-center hover:border-primary-500/40 transition-colors cursor-pointer bg-surface-200'
              >
                <Icon name='add_photo_alternate' className='text-primary-500/40' size='xl' />
              </div>
            ))}
          </div>
          <p className='text-xs text-neutral-600/50 mt-3'>
            Upload up to 20 gallery photos. Recommended: 1920×1080px
          </p>
        </div>

        {/* Floor Plan Upload */}
        <div>
          <h3 className='text-sm font-bold text-primary-500 uppercase tracking-widest mb-4'>
            Floor Plan
          </h3>
          <div className='border-2 border-dashed border-primary-500/20 rounded-2xl p-8 flex items-center gap-6 hover:border-primary-500/40 transition-colors cursor-pointer bg-surface-200'>
            <div className='w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center'>
              <Icon name='layers' className='text-primary-500' />
            </div>
            <div className='flex-1'>
              <p className='font-bold text-neutral-600'>Upload Floor Plan</p>
              <p className='text-sm text-neutral-600/60'>PDF or high-resolution image</p>
            </div>
            <Button variant='outline' size='sm'>
              Upload
            </Button>
          </div>
        </div>

        {/* Video/Virtual Tour */}
        <div>
          <h3 className='text-sm font-bold text-primary-500 uppercase tracking-widest mb-4'>
            Virtual Tour / Video
          </h3>
          <div className='bg-surface-200 rounded-xl p-6'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center'>
                <Icon name='videocam' className='text-primary-500' />
              </div>
              <div className='flex-1'>
                <input
                  type='url'
                  placeholder='Paste YouTube, Vimeo, or Matterport link...'
                  className='w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary-500 text-sm'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between pt-6 border-t border-primary-500/5'>
          <Button
            variant='outline'
            icon={<Icon name='arrow_back' />}
            iconPosition='left'
            onClick={onPrevious}
            type='button'
          >
            Previous
          </Button>
          <Button
            variant='primary'
            icon={<Icon name='arrow_forward' />}
            onClick={onNext}
            type='button'
          >
            Next: Review
          </Button>
        </div>
      </div>
    </Card>
  )
}
