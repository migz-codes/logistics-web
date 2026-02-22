import { createContext, useContext } from 'react'
import type { IChildrenProps } from '@/types/react.types'

export interface ISelectContext {
  error?: string | null
  icon?: IChildrenProps['children']
  tws?: {
    menu?: string
    option?: string
    control?: string
    singleValue?: string
    placeholder?: string
    dropdownIndicator?: string
  }
}

export const SelectContext = createContext({} as ISelectContext)

export const SelectProvider = ({
  children,
  ...props
}: { children: React.ReactNode } & ISelectContext) => {
  return <SelectContext.Provider value={props}>{children}</SelectContext.Provider>
}

export const useSelectContext = () => {
  return useContext(SelectContext)
}
