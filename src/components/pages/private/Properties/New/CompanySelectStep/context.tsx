import { createContext, useContext } from 'react'

export interface ICompanyStepContext {
  loading?: boolean
  companies?: any[]
  selected: string
  handleSelect: (companyId: string) => void
  handleCompanyCreated: () => void
}

export const CompanyStepContext = createContext({} as ICompanyStepContext)

export const CompanyStepProvider = ({
  children,
  ...props
}: { children: React.ReactNode } & ICompanyStepContext) => {
  return <CompanyStepContext.Provider value={props}>{children}</CompanyStepContext.Provider>
}

export const useCompanyStepContext = () => {
  return useContext(CompanyStepContext)
}
