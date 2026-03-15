'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_COMPANIES_QUERY,
  REMOVE_COMPANY_MUTATION,
  type RemoveCompanyResponse
} from '@/lib/apollo/mutations/company'
import { toast } from '@/lib/toast'
import type { Company } from '@/types/api'
import { CompanyForm } from '../CompanyForm'

interface CompanyActionsProps {
  company: Company
}

export const CompanyActions = ({ company }: CompanyActionsProps) => {
  const { refetch } = useQuery(GET_COMPANIES_QUERY, { skip: true })

  const [removeCompany, { loading: deleting }] =
    useMutation<RemoveCompanyResponse>(REMOVE_COMPANY_MUTATION)

  const handleDelete = async () => {
    try {
      await removeCompany({ variables: { id: company.id } })
      toast.success('Company deleted successfully')
      refetch()
    } catch {
      toast.error('Failed to delete company')
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <CompanyForm
        company={company}
        onSuccess={() => refetch()}
        trigger={
          <Button size='sm' variant='secondary'>
            <Icon name='edit' size='sm' />
          </Button>
        }
      />
      <Button size='sm' variant='secondary' onClick={handleDelete} disabled={deleting}>
        <Icon name='delete' size='sm' />
      </Button>
    </div>
  )
}
