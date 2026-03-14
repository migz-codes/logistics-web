'use client'

import { useTranslations } from 'next-intl'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { usePropertiesContext } from '../context'
import { Info } from './Info'
import { Properties } from './Properties'

export function InventoryTable() {
  const t = useTranslations('inventory')
  const { pagination } = usePropertiesContext()

  const getPageNumbers = () => {
    const pages: number[] = []
    const { currentPage, totalPages } = pagination
    const maxVisible = 5

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <Card padding='none'>
      <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
          <thead>
            <tr className='text-[10px] font-black uppercase tracking-widest text-neutral-600/40 border-b border-primary-500/5'>
              <th className='p-4 text-left'>{t('table.warehouse')}</th>
              <th className='p-4 text-left'>{t('table.region')}</th>
              <th className='p-4 text-right'>{t('table.area')}</th>
              <th className='p-4 text-center'>{t('table.status')}</th>
              <th className='p-4 text-right'>{t('table.price')}</th>
              <th className='p-4 text-center'>{t('table.actions')}</th>
            </tr>
          </thead>

          <Properties />
        </table>
      </div>

      {/* Pagination */}
      <div className='p-4 border-t border-primary-500/5 flex items-center justify-between'>
        <Info />

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={pagination.prevPage}
            disabled={pagination.currentPage === 1}
            className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Icon name='chevron_left' />
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              type='button'
              onClick={() => pagination.goToPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                page === pagination.currentPage
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-primary-500/10 text-neutral-600/60'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type='button'
            onClick={pagination.nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Icon name='chevron_right' />
          </button>
        </div>
      </div>
    </Card>
  )
}
