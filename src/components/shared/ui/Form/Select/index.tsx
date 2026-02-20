'use client'

import ReactSelect, {
  type ControlProps,
  components,
  type MenuProps,
  type Props
} from 'react-select'
import { colors } from '@/styles/themes/colors'
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
      className={tw(
        'text-neutral-600 font-medium placeholder-neutral-600/40',
        icon && 'pl-12',
        tws?.control
      )}
    >
      {icon && (
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary-500'>{icon}</span>
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
      className={tw(
        'text-neutral-600 font-medium placeholder-neutral-600/40',
        icon && 'pl-12',
        tws?.control
      )}
    >
      {icon && (
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary-500'>{icon}</span>
      )}

      {props.children}
    </components.Control>
  )
}

export const Select = ({ custom, ...props }: ISelectProps) => {
  const { error } = custom || {}

  return (
    <SelectProvider {...custom}>
      <ReactSelect
        {...props}
        components={{ Control, Menu }}
        styles={{
          control: (base) => ({
            ...base,
            width: '100%',
            padding: '16px 24px',
            borderRadius: '12px',
            backgroundColor: colors.surface[200],
            color: colors.neutral[600],
            border: 'none',
            boxShadow: error ? '0 0 0 2px rgb(239, 68, 68)' : 'none',
            '&:focus': {
              ring: '2px',
              ringColor: colors.primary[500]
            }
          }),
          menu: (base) => ({
            ...base,
            width: '100%',
            border: 'none',
            padding: '16px 24px',
            borderRadius: '12px',
            backgroundColor: colors.surface[200],
            boxShadow: error ? '0 0 0 2px rgb(239, 68, 68)' : 'none',
            '&:focus': { ring: '2px', ringColor: colors.primary[500] }
          })
        }}
      />
    </SelectProvider>
  )
}
