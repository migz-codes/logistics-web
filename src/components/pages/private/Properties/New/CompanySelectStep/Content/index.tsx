import { LoadingSpinner } from '@/components/shared/ui/LoadingSpinner'
import { CompanyList } from '../CompanyList'
import { useCompanyStepContext } from '../context'
import { EmptyState } from '../EmptyState'

export const Content = () => {
  const { loading, companies } = useCompanyStepContext()

  if (loading) return <LoadingSpinner />

  if (!companies || companies.length === 0) return <EmptyState />

  return <CompanyList />
}
