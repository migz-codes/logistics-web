import { atom } from 'jotai'

export interface User {
  id: string
  name: string
  email: string
}

const userAtom = atom<User | null>(null)

const userIdAtom = atom((get) => get(userAtom)?.id ?? null)
const userNameAtom = atom((get) => get(userAtom)?.name ?? null)
const userEmailAtom = atom((get) => get(userAtom)?.email ?? null)

export const userAtoms = {
  user: userAtom,
  userId: userIdAtom,
  userName: userNameAtom,
  userEmail: userEmailAtom
}
