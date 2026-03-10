import { useTranslations } from 'next-intl'
import { Icon } from '@/components/shared/ui/Icon'
import { useSidebarContext } from '../context'
import { Button } from './Button/index'

export function Logout() {
  const t = useTranslations('navigation')
  const { isCollapsed } = useSidebarContext()

  return (
    <Button>
      <Icon name='logout' size='md' />

      {!isCollapsed && <span className='text-sm font-medium'>{t('logout')}</span>}
    </Button>
  )
}
