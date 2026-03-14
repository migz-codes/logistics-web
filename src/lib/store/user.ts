import { atom } from 'jotai'
import type { User } from '@/types/api'

const userAtom = atom<User | null>(null)

const userNameAtom = atom((get) => get(userAtom)?.name ?? null)
const userEmailAtom = atom((get) => get(userAtom)?.email ?? null)
const userRoleAtom = atom((get) => get(userAtom)?.role ?? null)

export const userAtoms = {
  user: userAtom,
  userName: userNameAtom,
  userEmail: userEmailAtom,
  userRole: userRoleAtom
}
