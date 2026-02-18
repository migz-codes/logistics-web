'use client'

import { Icon } from '@/components/shared/ui/Icon'
import { tw } from '@/utils/tailwind'

interface Step {
  label: string
  icon: string
}

interface FormStepperProps {
  steps: Step[]
  currentStep: number
}

export function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <div className='bg-white rounded-3xl p-8 border border-primary/5'>
      <div className='flex items-center justify-between relative'>
        {/* Progress Line */}
        <div className='absolute top-6 left-0 right-0 h-1 bg-slate-200 mx-12 z-0'>
          <div
            className='h-full bg-primary transition-all duration-500'
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <div
              key={`step-${index}-${step.label}`}
              className='flex flex-col items-center relative z-10'
            >
              <div
                className={tw(
                  'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300',
                  isCompleted
                    ? 'bg-primary text-white'
                    : isActive
                      ? 'bg-earth text-white'
                      : 'bg-slate-200 text-earth/40'
                )}
              >
                {isCompleted ? <Icon name='check' /> : <Icon name={step.icon} />}
              </div>
              <span
                className={tw(
                  'text-xs font-bold mt-3 uppercase tracking-widest transition-colors',
                  isActive || isCompleted ? 'text-earth' : 'text-earth/40'
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
