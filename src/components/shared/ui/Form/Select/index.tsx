'use client'

import ReactSelect, {
  type ControlProps,
  components,
  type MenuProps,
  type Props
} from 'react-select'
import { tw } from '@/utils/tailwind'
import { type ISelectContext, SelectProvider, useSelectContext } from './context'

export interface ISelectProps extends Props {
  custom?: ISelectContext
}

const Menu = (props: MenuProps) => {
  const { icon, error, tws } = useSelectContext()

  return (
    <components.Menu
      {...props}
      className={tw('text-earth font-medium placeholder-earth/40', icon && 'pl-12', tws?.control)}
    >
      {icon && (
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary'>{icon}</span>
      )}

      {props.children}
    </components.Menu>
  )
}

const Control = (props: ControlProps) => {
  const { icon, error, tws } = useSelectContext()

  return (
    <components.Control
      {...props}
      className={tw('text-earth font-medium placeholder-earth/40', icon && 'pl-12', tws?.control)}
    >
      {icon && (
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary'>{icon}</span>
      )}

      {props.children}
    </components.Control>
  )
}

export const Select = ({ custom, ...props }: ISelectProps) => {
  const { error, tws } = custom || {}

  return (
    <SelectProvider {...custom}>
      <ReactSelect
        {...props}
        components={{ Control, Menu }}
        unstyled
        styles={{
          control: (base) => ({
            ...base,
            width: '100%',
            padding: '16px 24px',
            borderRadius: '12px',
            backgroundColor: '#fdfbf7',
            color: '#b6ada4',
            border: 'none',
            boxShadow: error ? '0 0 0 2px #ef4444' : 'none',
            '&:focus': {
              ring: '2px',
              ringColor: '#3b82f6'
            }
          }),
          menu: (base) => ({
            ...base,
            width: '100%',
            padding: '16px 24px',
            borderRadius: '12px',
            backgroundColor: '#fdfbf7',
            border: 'none',
            boxShadow: error ? '0 0 0 2px #ef4444' : 'none',
            '&:focus': {
              ring: '2px',
              ringColor: '#3b82f6'
            }
          })
        }}
      />
    </SelectProvider>
  )
}
