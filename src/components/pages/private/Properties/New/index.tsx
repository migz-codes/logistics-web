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
import { ReviewStep } from './ReviewStep'

const CREATE_WAREHOUSE = gql`
  mutation CreateWarehouse($input: CreateWarehouseInput!) {
    createWarehouse(input: $input) {
      id
      title
    }
  }
`

export interface IWarehouseFormData {
  company_id: string
  title: string
  description: string
  category: string
  area: string
  price: string
  status: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
}

const initialFormData: IWarehouseFormData = {
  company_id: '',
  title: '',
  description: '',
  category: '',
  area: '',
  price: '',
  status: 'available',
  address: '',
  city: '',
  state: '',
  country: '',
  zip_code: ''
}

export function NewProperty() {
  const t = useTranslations('warehouseEditor')
  const router = useRouter()

  const steps = [
    { label: t('steps.company'), icon: 'business' },
    { label: t('steps.basicInfo'), icon: 'info' },
    { label: t('steps.address'), icon: 'location_on' },
    { label: t('steps.review'), icon: 'check_circle' }
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<IWarehouseFormData>(initialFormData)

  const [createWarehouse, { loading }] = useMutation(CREATE_WAREHOUSE, {
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

  const handleSubmit = async () => {
    await createWarehouse({
      variables: {
        input: {
          company_id: formData.company_id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          area: formData.area,
          price: formData.price,
          status: formData.status,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip_code: formData.zip_code
        }
      }
    })
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
