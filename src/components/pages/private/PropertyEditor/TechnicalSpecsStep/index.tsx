'use client'

import { useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Textarea } from '@/components/shared/ui/Textarea'

interface CEPData {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

interface TechnicalSpecsStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function AddressStep({ onNext, onPrevious }: TechnicalSpecsStepProps) {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    category: '',
    cep: '',
    country: 'Brazil',
    state: '',
    city: '',
    address: '',
    totalArea: '',
    leasePrice: '',
    description: ''
  })

  const handleCEPChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFormData((prev: FormData) => ({ ...prev, cep: value }))

    // Brazilian CEP lookup (only works for Brazilian CEPs)
    if (value.length >= 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`)
        const data: CEPData = await response.json()

        console.log({ data })

        if (!data.erro) {
          setFormData((prev: FormData) => ({
            ...prev,
            address: data.logradouro || '',
            city: data.localidade || '',
            state: data.uf || ''
          }))
        }
      } catch (error) {
        console.error('Error looking up CEP:', error)
      }
    }
  }

  console.log('formData', formData)

  const handleInputChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value
      setFormData((prev: FormData) => ({ ...prev, [field]: value }))
    }

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-earth mb-8 flex items-center gap-3'>
        <Icon name='analytics' className='text-primary' />
        Address
      </h2>

      <form className='space-y-6'>
        <Input
          label='CEP Code'
          placeholder='e.g., 01310-100'
          value={formData.cep}
          onChange={handleCEPChange}
        />

        <Input
          label='Country'
          placeholder='e.g., Brazil'
          value={formData.country}
          onChange={handleInputChange('country')}
        />

        <Input
          label='State'
          placeholder='e.g., SP'
          value={formData.state}
          onChange={handleInputChange('state')}
        />

        <Input
          label='City'
          placeholder='e.g., São Paulo'
          value={formData.city}
          onChange={handleInputChange('city')}
        />

        <Textarea
          label='Address'
          placeholder='Full property address including street, number'
          rows={1}
          value={formData.address}
          onChange={handleInputChange('address')}
        />
      </form>

      <div className='flex justify-between pt-6 border-t border-primary/5'>
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
          Next: Media
        </Button>
      </div>
    </Card>
  )
}
