'use client'

import { useTranslations } from 'next-intl'
import { Icon } from '@/components/shared/ui/Icon'
import { tw } from '@/utils/tailwind'

interface PaginationInfo {
  totalPages: number
  totalCount: number
  currentPage: number
  itemsPerPage: number
}

interface TablePaginationProps {
  pagination: PaginationInfo
  onPageChange: (page: number) => void
}

export function TablePagination({ pagination, onPageChange }: TablePaginationProps) {
  const t = useTranslations('common')
  const { currentPage, totalPages, totalCount, itemsPerPage } = pagination

  const getPageNumbers = () => {
    const maxVisiblePages = 5
    const pages: number[] = []

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)

      for (let i = start; i <= end; i++) pages.push(i)
    }

    return pages
  }

  if (totalPages < 1) return <></>

  return (
    <div className={tw('p-4 border-t border-neutral-200 flex items-center justify-between')}>
      <p className={tw('text-sm text-neutral-600/60')}>
        {t('pagination.showing', {
          from: (currentPage - 1) * itemsPerPage + 1,
          to: Math.min(currentPage * itemsPerPage, totalCount),
          total: totalCount
        })}
      </p>

      <div className={tw('flex items-center gap-2 h-[32px]')}>
        <button
          type='button'
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={tw(
            'h-[32px] w-[32px] flex items-center justify-center rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <Icon name='chevron_left' size='sm' />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            type='button'
            onClick={() => onPageChange(page)}
            className={tw(
              'w-8 h-8 rounded-lg text-xs font-bold transition-colors',
              page === currentPage
                ? 'bg-primary-500 text-white'
                : 'hover:bg-primary-500/10 text-neutral-600/60'
            )}
          >
            {page}
          </button>
        ))}

        <button
          type='button'
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className={tw(
            'h-[32px] w-[32px] flex items-center justify-center rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <Icon name='chevron_right' size='sm' />
        </button>
      </div>
    </div>
  )
}
