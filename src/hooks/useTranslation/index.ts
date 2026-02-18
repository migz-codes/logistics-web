import { useLocale, useTranslations } from 'next-intl'

export type TTranslation = (string: string) => string

export const useTranslation = () => {
  const locale = useLocale()
  const t = useTranslations() as unknown as TTranslation

  return { t, locale }
}
