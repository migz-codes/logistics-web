'use client'

import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@radix-ui/themes'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/shared/ui/Button'
import { Field } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import {
  CREATE_COMPANY_MUTATION,
  type CreateCompanyResponse,
  UPDATE_COMPANY_MUTATION,
  type UpdateCompanyResponse
} from '@/lib/apollo/mutations/company'
import { toast } from '@/lib/toast'
import type { Company } from '@/types/api'

const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  logo: z.string().optional()
})

type CompanyFormData = z.infer<typeof companySchema>

interface CompanyFormProps {
  company?: Company | null
  onSuccess?: () => void
  trigger: React.ReactNode
}

export function CompanyForm({ company, onSuccess, trigger }: CompanyFormProps) {
  const t = useTranslations('companies')
  const [open, setOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string>(company?.logo || '')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!company

  const [createCompany] = useMutation<CreateCompanyResponse>(CREATE_COMPANY_MUTATION)
  const [updateCompany] = useMutation<UpdateCompanyResponse>(UPDATE_COMPANY_MUTATION)

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: '', logo: '' }
  })

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset(company ? { name: company.name, logo: company.logo || '' } : { name: '', logo: '' })
      setLogoUrl(company?.logo || '')
    }
  }

  const getAccessToken = () => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1]
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const token = getAccessToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setLogoUrl(data.url)
    } catch {
      toast.error(t('form.uploadError'))
    } finally {
      setUploading(false)
    }
  }

  const onFormSubmit = async (data: CompanyFormData) => {
    const submitData = { name: data.name, logo: logoUrl || undefined }

    try {
      if (isEditing && company) {
        await updateCompany({ variables: { input: { id: company.id, ...submitData } } })
        toast.success(t('updated'))
      } else {
        await createCompany({ variables: { input: submitData } })
        toast.success(t('created'))
      }
      setOpen(false)
      reset({ name: '', logo: '' })
      onSuccess?.()
    } catch {
      toast.error(isEditing ? t('updateError') : t('createError'))
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content maxWidth='500px'>
        <div className='flex items-center gap-2 h-[48px] mb-6'>
          <div className='w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center'>
            <Icon name='business' className='text-primary-500' size='md' />
          </div>

          <div className='flex flex-col justify-center h-[48px]'>
            <Dialog.Title className='text-sm font-bold text-neutral-600 h-[24px] flex !m-[0px] !p-[0px]'>
              {isEditing ? t('editTitle') : t('createTitle')}
            </Dialog.Title>

            <Dialog.Description className='text-xs text-neutral-600/60 h-[24px] flex !m-[0px] !p-[0px]'>
              {isEditing ? t('editSubtitle') : t('createSubtitle')}
            </Dialog.Description>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <span className='block text-xs font-black text-neutral-600/50 uppercase tracking-widest'>
              {t('form.logo')}
            </span>

            <div className='relative w-full aspect-square max-w-[256px] bg-surface-200 rounded-xl flex items-center justify-center overflow-hidden group cursor-pointer mx-auto'>
              {logoUrl ? (
                <>
                  <Image
                    src={logoUrl}
                    alt='Logo'
                    width={256}
                    height={256}
                    className='w-[256px] h-full object-cover rounded-xl'
                    unoptimized
                  />
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                    {uploading ? (
                      <Icon
                        name='progress_activity'
                        className='animate-spin text-white'
                        size='lg'
                      />
                    ) : (
                      <Icon name='upload' className='text-white' size='lg' />
                    )}
                  </div>
                </>
              ) : (
                <div className='flex flex-col items-center justify-center gap-2'>
                  {uploading ? (
                    <Icon
                      name='progress_activity'
                      className='animate-spin text-neutral-400'
                      size='xl'
                    />
                  ) : (
                    <Icon name='upload' className='text-neutral-400' size='xl' />
                  )}
                  <span className='text-xs text-neutral-400 font-medium'>
                    {uploading ? t('form.uploading') : t('form.uploadLogo')}
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />

              {logoUrl && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setLogoUrl('')}
                  className='absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1'
                >
                  <Icon name='close' size='sm' />
                </Button>
              )}
            </div>
          </div>

          <Field
            name='name'
            register={registerField}
            label={t('form.name')}
            placeholder={t('form.namePlaceholder')}
            errorMessage={errors.name?.message}
            required
          />

          <div className='flex items-center justify-end gap-3 pt-6 border-t border-neutral-200'>
            <Dialog.Close>
              <Button type='button' variant='secondary'>
                {t('form.cancel')}
              </Button>
            </Dialog.Close>

            <Button type='submit' variant='primary' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icon name='progress_activity' className='animate-spin' size='sm' />
                  {t('form.saving')}
                </>
              ) : (
                <>
                  <Icon name='save' size='sm' />
                  {isEditing ? t('form.update') : t('form.create')}
                </>
              )}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
