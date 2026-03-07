import { createContext, useContext } from 'react'
import type { PaginationActions, PaginationState } from '@/hooks/usePagination'
import type { IProperty } from '@/types/property.types'

export interface IPropertiesContext {
  properties: IProperty[]
  loading?: boolean
  error?: string
  pagination: PaginationState & PaginationActions
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
