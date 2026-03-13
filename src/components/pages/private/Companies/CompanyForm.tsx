'use client'

import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@radix-ui/themes'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/shared/ui/Button'
import { Field } from '@/components/shared/ui/Field'
import { Icon } from '@/components/shared/ui/Icon'
import {
  type Company,
  CREATE_COMPANY_MUTATION,
  type CreateCompanyResponse,
  UPDATE_COMPANY_MUTATION,
  type UpdateCompanyResponse
} from '@/lib/apollo/mutations/company'
import { toast } from '@/lib/toast'

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
    }
  }

  const onFormSubmit = async (data: CompanyFormData) => {
    const submitData = { name: data.name, logo: data.logo || undefined }

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

      <Dialog.Content maxWidth='450px'>
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
          <Field
            name='name'
            register={registerField}
            label={t('form.name')}
            placeholder={t('form.namePlaceholder')}
            errorMessage={errors.name?.message}
            required
          />

          <Field
            name='logo'
            register={registerField}
            label={t('form.logo')}
            placeholder={t('form.logoPlaceholder')}
            errorMessage={errors.logo?.message}
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
