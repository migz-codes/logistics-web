import { atom } from 'jotai'

export type Role = 'INVESTOR_ADMIN' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  created_at: string
  updated_at: string
}

const userAtom = atom<User | null>(null)

const userNameAtom = atom((get) => get(userAtom)?.name ?? null)
const userEmailAtom = atom((get) => get(userAtom)?.email ?? null)
const userRoleAtom = atom((get) => get(userAtom)?.role ?? null)
const isAdminAtom = atom((get) => get(userAtom)?.role === 'ADMIN')

export const userAtoms = {
  user: userAtom,
  userName: userNameAtom,
  userEmail: userEmailAtom,
  userRole: userRoleAtom,
  isAdmin: isAdminAtom
}
