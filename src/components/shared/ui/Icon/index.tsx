interface IconProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-4xl'
}

export function Icon({ name, className = '', size = 'md' }: IconProps) {
  return <span className={`material-symbols-outlined ${sizes[size]} ${className}`}>{name}</span>
}
