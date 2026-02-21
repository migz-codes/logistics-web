import { createContext, useContext } from 'react'
import type { IChildrenProps } from '@/types/react.types'

export interface ISelectContext {
  error?: string | null
  tws?: {
    control?: string
    option?: string
    menu?: string
    singleValue?: string
    placeholder?: string
  }
  icon?: IChildrenProps['children']
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
