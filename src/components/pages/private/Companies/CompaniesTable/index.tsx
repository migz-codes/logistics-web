'use client'

import { useQuery } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Icon } from '@/components/shared/ui/Icon'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderTitle,
  TablePagination,
  TableRow,
  TableWrapper
} from '@/components/shared/ui/Table'
import { GET_COMPANIES_QUERY, type GetCompaniesResponse } from '@/lib/apollo/mutations/company'
import { CompanyActions } from './CompanyActions'
import { CompanyCreatedDate } from './CompanyCreatedDate'
import { CompanyName } from './CompanyName'
import { EmptyState } from './EmptyState'

const itemsPerPage = 10

export function CompaniesTable() {
  const t = useTranslations('companies')

  const [currentPage, setCurrentPage] = useState(1)

  const { data, loading, refetch } = useQuery<GetCompaniesResponse>(GET_COMPANIES_QUERY, {})

  const allCompanies = data?.getMyCompanies || []
  const totalCount = allCompanies.length
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return allCompanies.slice(start, start + itemsPerPage)
  }, [allCompanies, currentPage])

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Icon name='progress_activity' className='text-primary-500 animate-spin' size='xl' />
      </div>
    )
  }

  if (!allCompanies || allCompanies.length === 0) {
    return <EmptyState onRefetch={refetch} createText={t('createFirst')} />
  }

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderTitle>{t('table.name')}</TableHeaderTitle>
            <TableHeaderTitle>{t('table.created')}</TableHeaderTitle>
            <TableHeaderTitle className='w-40'>{t('table.actions')}</TableHeaderTitle>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedCompanies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                <CompanyName company={company} />
              </TableCell>

              <TableCell>
                <CompanyCreatedDate company={company} />
              </TableCell>

              <TableCell className='w-40'>
                <CompanyActions company={company} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages >= 1 && (
        <TablePagination
          pagination={{ currentPage, totalPages, totalCount, itemsPerPage }}
          onPageChange={(page) => {
            setCurrentPage(page)
          }}
        />
      )}
    </TableWrapper>
  )
}
