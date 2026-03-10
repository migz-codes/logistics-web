'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { BasicInfoStep } from './BasicInfoStep'
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

const steps = [
  { label: 'Basic Info', icon: 'info' },
  { label: 'Review', icon: 'check_circle' }
]

export function NewProperty() {
  const t = useTranslations('warehouseEditor')
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<IWarehouseFormData>(initialFormData)

  const [createWarehouse, { loading }] = useMutation(CREATE_WAREHOUSE, {
    onCompleted: () => {
      router.push('/admin/inventory')
    },
    onError: (error) => {
      console.error('Error creating warehouse:', error)
    }
  })

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
        return <BasicInfoStep formData={formData} onNext={handleNext} />

      case 1:
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
    <main className='flex-1 p-8'>
      <header className='mb-10'>
        <h1 className='text-4xl font-extrabold text-neutral-600 flex items-center gap-3'>
          <span className='text-secondary-500'>{`//`}</span>
          {t('title')}
        </h1>

        <p className='text-neutral-600/50 font-medium mt-2'>{t('subtitle')}</p>
      </header>

      <FormStepper steps={steps} currentStep={currentStep} />

      <div className='mt-10'>{renderStep()}</div>
    </main>
  )
}
