'use client'

import { useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Select } from '@/components/shared/ui/Select'
import { Textarea } from '@/components/shared/ui/Textarea'

const steps = [
  { id: 1, label: 'Company Info' },
  { id: 2, label: 'Project Details' },
  { id: 3, label: 'Investment Scope' }
]

export function SubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const companyTypeOptions = [
    { value: '', label: 'Select Company Type' },
    { value: 'developer', label: 'Real Estate Developer' },
    { value: 'investor', label: 'Investment Firm' },
    { value: 'corporate', label: 'Corporate Entity' },
    { value: 'fund', label: 'Private Equity Fund' }
  ]

  const regionOptions = [
    { value: '', label: 'Select Region' },
    { value: 'southeast', label: 'Southeast' },
    { value: 'south', label: 'South' },
    { value: 'northeast', label: 'Northeast' }
  ]

  const investmentRangeOptions = [
    { value: '', label: 'Select Range' },
    { value: '10-50', label: 'R$ 10M - 50M' },
    { value: '50-100', label: 'R$ 50M - 100M' },
    { value: '100-250', label: 'R$ 100M - 250M' },
    { value: '250+', label: 'R$ 250M+' }
  ]

  return (
    <Card variant='elevated'>
      {/* Step Indicator */}
      <div className='flex items-center justify-between mb-10'>
        {steps.map((step, index) => (
          <div key={step.id} className='flex items-center'>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                currentStep >= step.id
                  ? 'bg-primary text-white'
                  : 'bg-cream text-earth/40'
              }`}
            >
              {step.id}
            </div>
            <span
              className={`ml-3 text-sm font-bold ${
                currentStep >= step.id ? 'text-earth' : 'text-earth/40'
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className='w-24 h-1 bg-cream mx-6'>
                <div
                  className={`h-full bg-primary transition-all ${
                    currentStep > step.id ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <form className='space-y-6'>
        {currentStep === 1 && (
          <>
            <h3 className='text-xl font-bold text-earth mb-6'>
              Company Information
            </h3>
            <div className='grid md:grid-cols-2 gap-6'>
              <Input label='Company Name' placeholder='Your company legal name' />
              <Select label='Company Type' options={companyTypeOptions} />
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
              <Input label='Contact Name' placeholder='Primary contact person' />
              <Input label='Position / Title' placeholder='e.g., Investment Director' />
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
              <Input label='Email' placeholder='email@company.com' type='email' />
              <Input label='Phone' placeholder='+55 (11) 99999-9999' type='tel' />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className='text-xl font-bold text-earth mb-6'>Project Details</h3>
            <Input label='Project Name' placeholder='Name or identifier for your project' />
            <div className='grid md:grid-cols-2 gap-6'>
              <Select label='Target Region' options={regionOptions} />
              <Input label='Total Area (m²)' placeholder='e.g., 50000' type='number' />
            </div>
            <Textarea
              label='Project Description'
              placeholder='Describe your project, including property type, key features, and objectives...'
              rows={4}
            />
          </>
        )}

        {currentStep === 3 && (
          <>
            <h3 className='text-xl font-bold text-earth mb-6'>Investment Scope</h3>
            <div className='grid md:grid-cols-2 gap-6'>
              <Select label='Investment Range' options={investmentRangeOptions} />
              <Input label='Expected ROI (%)' placeholder='e.g., 12' type='number' />
            </div>
            <Textarea
              label='Additional Information'
              placeholder="Any other details you'd like to share about your investment goals..."
              rows={4}
            />
            <label className='flex items-start gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10 cursor-pointer'>
              <input
                type='checkbox'
                className='w-5 h-5 rounded text-primary focus:ring-primary mt-0.5'
              />
              <div>
                <p className='font-bold text-earth mb-1'>
                  I agree to the terms and conditions
                </p>
                <p className='text-sm text-earth/60'>
                  By submitting, you agree to our privacy policy and investment partnership terms.
                </p>
              </div>
            </label>
          </>
        )}

        <div className='flex justify-between pt-6 border-t border-primary/5'>
          {currentStep > 1 ? (
            <Button
              variant='outline'
              icon={<Icon name='arrow_back' />}
              iconPosition='left'
              onClick={() => setCurrentStep(currentStep - 1)}
              type='button'
            >
              Previous
            </Button>
          ) : (
            <div />
          )}
          {currentStep < 3 ? (
            <Button
              variant='primary'
              icon={<Icon name='arrow_forward' />}
              onClick={() => setCurrentStep(currentStep + 1)}
              type='button'
            >
              Next Step
            </Button>
          ) : (
            <Button variant='primary' icon={<Icon name='send' />} type='submit'>
              Submit Proposal
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
