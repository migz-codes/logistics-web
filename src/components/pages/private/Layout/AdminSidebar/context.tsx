import { createContext, useContext } from 'react'

export interface ISidebarContext {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export const SidebarContext = createContext({} as ISidebarContext)

export const SidebarProvider = ({
  children,
  isCollapsed,
  setIsCollapsed
}: {
  children: React.ReactNode
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}) => {
  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  return useContext(SidebarContext)
}
