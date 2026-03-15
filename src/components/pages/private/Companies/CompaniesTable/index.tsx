'use client'

import { useTranslations } from 'next-intl'
import type { TableColumn } from '@/components/shared/ui/Table'
import { Table } from '@/components/shared/ui/Table'
import type { Company } from '@/types/api'

import { CompanyActions } from './CompanyActions'
import { CompanyName } from './CompanyName'
import { EmptyState } from './EmptyState'

interface CompaniesTableProps {
  companies: Company[]
  onRefetch: () => void
}

export function CompaniesTable({ companies, onRefetch }: CompaniesTableProps) {
  const t = useTranslations('companies')

  const columns: TableColumn<Company>[] = [
    {
      key: 'name',
      header: t('table.name'),
      render: (_, company) => <CompanyName company={company} />
    },
    {
      key: 'created_at',
      header: t('table.created'),
      value: (company) => new Date(company.created_at).toLocaleDateString()
    },
    {
      key: 'id' as keyof Company,
      header: t('table.actions'),
      render: (_, company) => <CompanyActions company={company} />
    }
  ]

  const emptyState = <EmptyState onRefetch={onRefetch} createText={t('createFirst')} />

  return <Table data={companies} columns={columns} emptyState={emptyState} rowKey='id' />
}
