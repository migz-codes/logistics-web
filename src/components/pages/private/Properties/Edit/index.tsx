'use client'

import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { toast } from '@/lib/toast'
import { AddressStep } from '../New/AddressStep'
import { BasicInfoStep } from '../New/BasicInfoStep'
import { FormStepper } from '../New/FormStepper'
import { MediaStep } from '../New/MediaStep'
import { EditReviewStep } from './ReviewStep'

const GET_WAREHOUSE = gql`
  query GetWarehouse($id: String!) {
    warehouse(id: $id) {
      id
      accountable_id
      company_id
      title
      description
      city
      state
      images
      area_total
      status
      price
      address
      country
      zip_code
      address_complement
    }
  }
`

const UPDATE_WAREHOUSE = gql`
  mutation UpdateWarehouse($input: UpdateWarehouseInput!) {
    updateWarehouse(input: $input) {
      id
      title
    }
  }
`

interface Warehouse {
  id: string
  accountable_id: string
  company_id: string
  title: string
  description: string
  city: string
  state: string
  images: string[]
  area_total: number
  status: 'AVAILABLE' | 'UNAVAILABLE'
  price: string
  address: string
  country: string
  zip_code: string
  address_complement: string | null
}

interface GetWarehouseResponse {
  warehouse: Warehouse | null
}

interface UpdateWarehouseResponse {
  updateWarehouse: {
    id: string
    title: string
  } | null
}

export interface IWarehouseEditFormData {
  id: string
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
  existingImages: string[]
}

interface EditPropertyProps {
  warehouseId: string
}

export function EditProperty({ warehouseId }: EditPropertyProps) {
  const t = useTranslations('warehouseEditor')
  const router = useRouter()

  const steps = [
    { label: t('steps.basicInfo'), icon: 'info' },
    { label: t('steps.address'), icon: 'location_on' },
    { label: t('steps.media'), icon: 'image' },
    { label: t('steps.review'), icon: 'check_circle' }
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<IWarehouseEditFormData | null>(null)

  const { data, loading: queryLoading } = useQuery<GetWarehouseResponse>(GET_WAREHOUSE, {
    variables: { id: warehouseId }
  })

  const [updateWarehouse, { loading: mutationLoading }] = useMutation<UpdateWarehouseResponse>(
    UPDATE_WAREHOUSE,
    {
      onCompleted: () => {
        toast.success(t('toast.updateSuccess'))
        router.push('/admin/properties')
      },
      onError: (error) => {
        toast.error(t('toast.updateError'))
        console.error('Error updating warehouse:', error)
      }
    }
  )

  useEffect(() => {
    if (data?.warehouse && !formData) {
      const warehouse = data.warehouse
      setFormData({
        id: warehouse.id,
        company_id: warehouse.company_id,
        title: warehouse.title,
        description: warehouse.description,
        area_total: String(warehouse.area_total),
        price: warehouse.price,
        status: warehouse.status,
        address: warehouse.address,
        address_complement: warehouse.address_complement || '',
        city: warehouse.city,
        state: warehouse.state,
        country: warehouse.country,
        zip_code: warehouse.zip_code,
        images: [],
        existingImages: warehouse.images || []
      })
    }
  }, [data, formData])

  const handleNext = (stepData: Partial<IWarehouseEditFormData>) => {
    setFormData((prev) => (prev ? { ...prev, ...stepData } : null))
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
    if (!formData) return

    await updateWarehouse({
      variables: {
        input: {
          id: formData.id,
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

    if (formData.images.length > 0) {
      try {
        await uploadImages(formData.id, formData.images)
      } catch (error) {
        console.error('Error uploading images:', error)
        toast.error(t('toast.imageUploadError'))
      }
    }
  }

  if (queryLoading || !formData) {
    return (
      <main className='flex-1 p-8 min-w-0 flex flex-col items-center justify-center'>
        <p className='text-neutral-600/50'>{t('loading')}</p>
      </main>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep formData={formData} onNext={handleNext} onBack={undefined} />

      case 1:
        return <AddressStep formData={formData} onNext={handleNext} onBack={handlePrevious} />

      case 2:
        return (
          <MediaStep
            images={formData.images}
            onNext={(images) => handleNext({ images })}
            onPrevious={handlePrevious}
          />
        )

      case 3:
        return (
          <EditReviewStep
            formData={formData}
            loading={mutationLoading}
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
          {t('editTitle')}
        </h1>

        <p className='text-neutral-600/50 font-medium mt-2'>{t('editSubtitle')}</p>
      </header>

      <FormStepper steps={steps} currentStep={currentStep} />

      <div className='mt-10 max-w-full'>{renderStep()}</div>
    </main>
  )
}
