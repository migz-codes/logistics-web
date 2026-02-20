import { usePropertiesContext } from '../../context'

export const Info = () => {
  const { pagination } = usePropertiesContext()

  return (
    <p className='text-xs text-neutral-600/50'>
      Showing {pagination.startIndex === 0 ? 0 : pagination.startIndex + 1}-{pagination.endIndex} of{' '}
      {pagination.totalItems} properties
    </p>
  )
}
