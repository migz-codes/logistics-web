import { useTranslations } from 'next-intl'
import { usePropertiesContext } from '../../context'

export const Info = () => {
  const t = useTranslations('inventory')
  const { pagination } = usePropertiesContext()

  const start = pagination.totalItems === 0 ? 0 : pagination.startIndex + 1
  const end = Math.min(pagination.endIndex, pagination.totalItems)

  return (
    <p className='text-xs text-neutral-600/50'>
      {t('pagination.showing')} {start}-{end} {t('pagination.of')} {pagination.totalItems}{' '}
      {t('pagination.warehouses')}
    </p>
  )
}
