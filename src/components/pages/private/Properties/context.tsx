import { createContext, useContext } from 'react'
import type { PaginationActions, PaginationState } from '@/hooks/usePagination'
import type { Warehouse } from '@/types/api'

export interface IFilters {
  search: string
  region: string
  status: string
}

export interface IPropertiesContext {
  warehouses: Warehouse[]
  loading?: boolean
  error?: string
  pagination: PaginationState & PaginationActions
  filters: IFilters
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>
  refetch: () => void
}

export const PropertiesContext = createContext({} as IPropertiesContext)

export const PropertiesProvider = ({
  children,
  ...props
}: { children: React.ReactNode } & IPropertiesContext) => {
  return <PropertiesContext.Provider value={props}>{children}</PropertiesContext.Provider>
}

export const usePropertiesContext = () => {
  return useContext(PropertiesContext)
}
