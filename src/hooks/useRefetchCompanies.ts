import { useApolloClient } from '@apollo/client/react'
import { GET_COMPANIES_QUERY } from '@/lib/apollo/mutations/company'

export function useRefetchCompanies() {
  const client = useApolloClient()

  const refetchCompanies = async () => {
    await client.refetchQueries({ include: [GET_COMPANIES_QUERY] })
  }

  return refetchCompanies
}
