'use client'

import type {
  ControlProps,
  MenuListProps,
  MenuProps,
  OptionProps,
  PlaceholderProps,
  Props
} from 'react-select'
import ReactSelect, { components } from 'react-select'
import { tw } from '@/utils/tailwind'
import { type ISelectContext, SelectProvider, useSelectContext } from './context'

export interface ISelectProps extends Props {
  custom?: ISelectContext
}

const SingleValue = (props: any) => {
  const { tws } = useSelectContext()

  return (
    <components.SingleValue
      {...props}
      className={tw('text-neutral-600 p-0 font-medium', tws?.singleValue)}
    />
  )
}

const Placeholder = (props: PlaceholderProps) => {
  const { tws } = useSelectContext()

  return (
    <components.Placeholder
      {...props}
      className={tw('p-0 font-medium text-neutral-600/40', tws?.placeholder)}
    >
      {props.children}
    </components.Placeholder>
  )
}

const Option = (props: OptionProps) => {
  const { tws } = useSelectContext()

  return (
    <components.Option
      {...props}
      className={tw('p-4 hover:bg-surface-500 cursor-pointer', tws?.option)}
    >
      {props.children}
    </components.Option>
  )
}

const MenuList = (props: MenuListProps) => {
  return (
    <components.MenuList {...props} className={tw('p-0')}>
      {props.children}
    </components.MenuList>
  )
}

const Menu = (props: MenuProps) => {
  const { tws } = useSelectContext()

  return (
    <components.Menu
      {...props}
      className={tw(
        'w-full rounded-xl overflow-hidden bg-surface-200 text-neutral-600 font-medium placeholder-neutral-600/40 border-none mt-4 shadow-lg',
        tws?.menu
      )}
    >
      {props.children}
    </components.Menu>
  )
}

const Control = (props: ControlProps) => {
  const { icon, tws } = useSelectContext()

  return (
    <components.Control
      {...props}
      className={tw(
        'w-full h-[56px] px-4 rounded-xl bg-surface-200 text-neutral-600 border-none shadow-none focus:ring-2 focus:ring-primary-500',
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

export const Select = ({ custom, ...props }: ISelectProps) => (
  <SelectProvider {...custom}>
    <ReactSelect
      {...props}
      unstyled
      components={{ Control, Menu, MenuList, Option, Placeholder, SingleValue }}
    />
  </SelectProvider>
)
