'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from '@/lib/toast'
import { AddressStep } from './AddressStep'
import { BasicInfoStep } from './BasicInfoStep'
import { CompanySelectStep } from './CompanySelectStep'
import { FormStepper } from './FormStepper'
import { MediaStep } from './MediaStep'
import { ReviewStep } from './ReviewStep'

const CREATE_WAREHOUSE = gql`
  mutation CreateWarehouse($input: CreateWarehouseInput!) {
    createWarehouse(input: $input) {
      id
      title
    }
  }
`

interface CreateWarehouseResponse {
  createWarehouse: {
    id: string
    title: string
  } | null
}

export interface IWarehouseFormData {
  company_id: string
  title: string
  description: string
  area_total: string
  price: string
  status: 'AVAILABLE' | 'UNAVAILABLE'
  address: string
  address_complement: string
  city: string
  state: string
  country: string
  zip_code: string
  images: File[]
}

const initialFormData: IWarehouseFormData = {
  company_id: '',
  title: '',
  description: '',
  area_total: '',
  price: '',
  status: 'AVAILABLE',
  address: '',
  address_complement: '',
  city: '',
  state: '',
  country: '',
  zip_code: '',
  images: []
}

export function NewProperty() {
  const t = useTranslations('warehouseEditor')
  const router = useRouter()

  const steps = [
    { label: t('steps.company'), icon: 'business' },
    { label: t('steps.basicInfo'), icon: 'info' },
    { label: t('steps.address'), icon: 'location_on' },
    { label: t('steps.media'), icon: 'image' },
    { label: t('steps.review'), icon: 'check_circle' }
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<IWarehouseFormData>(initialFormData)

  const [createWarehouse, { loading }] = useMutation<CreateWarehouseResponse>(CREATE_WAREHOUSE, {
    onCompleted: () => {
      toast.success(t('toast.createSuccess'))
      router.push('/admin/properties')
    },
    onError: (error) => {
      toast.error(t('toast.createError'))
      console.error('Error creating warehouse:', error)
    }
  })

  const handleCompanySelect = (companyId: string) => {
    setFormData((prev) => ({ ...prev, company_id: companyId }))
    setCurrentStep(1)
  }

  const handleNext = (data: Partial<IWarehouseFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getAccessToken = () => {
    if (typeof document === 'undefined') return undefined
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1]
  }

  const uploadImages = async (warehouseId: string, images: File[]) => {
    if (images.length === 0) return

    const formDataUpload = new FormData()
    images.forEach((file) => {
      formDataUpload.append('files', file)
    })

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    const token = getAccessToken()
    const response = await fetch(`${apiUrl}/warehouses/${warehouseId}/images`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formDataUpload
    })

    if (!response.ok) {
      throw new Error('Failed to upload images')
    }

    return response.json()
  }

  const handleSubmit = async () => {
    const result = await createWarehouse({
      variables: {
        input: {
          company_id: formData.company_id,
          title: formData.title,
          description: formData.description,
          area_total: parseFloat(formData.area_total) || 0,
          price: formData.price,
          status: formData.status,
          address: formData.address,
          address_complement: formData.address_complement || null,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip_code: formData.zip_code
        }
      }
    })

    // Upload images after warehouse is created
    if (result.data?.createWarehouse?.id && formData.images.length > 0) {
      try {
        await uploadImages(result.data.createWarehouse.id, formData.images)
      } catch (error) {
        console.error('Error uploading images:', error)
        toast.error(t('toast.imageUploadError'))
      }
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanySelectStep selectedCompanyId={formData.company_id} onNext={handleCompanySelect} />
        )

      case 1:
        return <BasicInfoStep formData={formData} onNext={handleNext} onBack={handlePrevious} />

      case 2:
        return <AddressStep formData={formData} onNext={handleNext} onBack={handlePrevious} />

      case 3:
        return (
          <MediaStep
            images={formData.images}
            onNext={(images) => handleNext({ images })}
            onPrevious={handlePrevious}
          />
        )

      case 4:
        return (
          <ReviewStep
            formData={formData}
            loading={loading}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        )
    }
  }

  return (
    <main className='flex-1 p-8 min-w-0 flex flex-col'>
      <header className='mb-10'>
        <h1 className='text-4xl font-extrabold text-neutral-600 flex items-center gap-3'>
          <span className='text-secondary-500'>{`//`}</span>
          {t('title')}
        </h1>

        <p className='text-neutral-600/50 font-medium mt-2'>{t('subtitle')}</p>
      </header>

      <FormStepper steps={steps} currentStep={currentStep} />

      <div className='mt-10 max-w-full'>{renderStep()}</div>
    </main>
  )
}
