'use client'

import { useState } from 'react'
import { BasicInfoStep } from './BasicInfoStep'
import { FormStepper } from './FormStepper'
import { MediaStep } from './MediaStep'
import { ReviewStep } from './ReviewStep'

const steps = [
  { label: 'Basic Info', icon: 'info' },
  { label: 'Media', icon: 'image' },
  { label: 'Review', icon: 'check_circle' }
]

export function PropertyEditorPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep onNext={handleNext} />
      case 1:
        return <MediaStep onNext={handleNext} onPrevious={handlePrevious} />
      case 2:
        return <ReviewStep onPrevious={handlePrevious} />
    }
  }

  return (
    <main className='flex-1 p-8'>
      <header className='mb-10'>
        <h1 className='text-4xl font-extrabold text-earth flex items-center gap-3'>
          <span className='text-secondary'>{`//`}</span>
          Create New Property
        </h1>
        <p className='text-earth/50 font-medium mt-2'>
          Fill in all required information to add a new property to the inventory.
        </p>
      </header>

      <FormStepper steps={steps} currentStep={currentStep} />

      <div className='mt-10'>{renderStep()}</div>
    </main>
  )
}
