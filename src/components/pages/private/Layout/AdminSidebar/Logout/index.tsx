import { useTranslations } from 'next-intl'
import { Icon } from '@/components/shared/ui/Icon'
import { Button } from './Button'

export function Logout() {
  const t = useTranslations('navigation')

  return (
    <Button>
      <Icon name='logout' size='md' />

      <span className='text-sm font-medium'>{t('logout')}</span>
    </Button>
  )
}
