'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import type { ChangeEvent } from 'react'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value
    startTransition(() => {
      router.replace(`/${nextLocale}${pathname}`)
    })
  }

  return (
    <select
      className='rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      defaultValue={locale}
      onChange={handleChange}
      disabled={isPending}
    >
      <option value='en'>English</option>
      <option value='es'>Español</option>
      <option value='pt-BR'>Português (BR)</option>
    </select>
  )
}
