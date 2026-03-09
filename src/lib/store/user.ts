import { atom } from 'jotai'

export type Role = 'ADMIN' | 'SUPERADMIN'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

const userAtom = atom<User | null>(null)

const userIdAtom = atom((get) => get(userAtom)?.id ?? null)
const userNameAtom = atom((get) => get(userAtom)?.name ?? null)
const userEmailAtom = atom((get) => get(userAtom)?.email ?? null)
const userRoleAtom = atom((get) => get(userAtom)?.role ?? null)
const isSuperAdminAtom = atom((get) => get(userAtom)?.role === 'SUPERADMIN')

export const userAtoms = {
  user: userAtom,
  userId: userIdAtom,
  userName: userNameAtom,
  userEmail: userEmailAtom,
  userRole: userRoleAtom,
  isSuperAdmin: isSuperAdminAtom
}
