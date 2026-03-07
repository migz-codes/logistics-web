import { tw } from '@/utils/tailwind'

interface IconProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Icon({ name, className = '' }: IconProps) {
  return <span className={tw(`material-symbols-outlined`, className)}>{name}</span>
}
