'use client'

import { useTranslations } from 'next-intl'
import type {
  ControlProps,
  DropdownIndicatorProps,
  InputProps,
  MenuListProps,
  MenuProps,
  OptionProps,
  PlaceholderProps,
  Props
} from 'react-select'
import ReactSelect, { components } from 'react-select'
import { Icon } from '@/components/shared/ui/Icon'
import { Tooltip } from '@/components/shared/ui/Tooltip'
import { tw } from '@/utils/tailwind'
import { type ISelectContext, SelectProvider, useSelectContext } from './context'

export interface ISelectProps extends Props {
  custom?: ISelectContext
  label?: string
  errorMessage?: string
}

const SingleValue = (props: any) => {
  const { tws } = useSelectContext()

  return (
    <components.SingleValue
      {...props}
      className={tw('text-neutral-600 p-0 font-medium focus:outline-none', tws?.singleValue)}
    />
  )
}

const Placeholder = (props: PlaceholderProps) => {
  const { tws } = useSelectContext()

  return (
    <components.Placeholder
      {...props}
      className={tw('p-0 font-medium text-neutral-600/40 focus:outline-none', tws?.placeholder)}
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
  const { icon, tws, error } = useSelectContext()

  return (
    <components.Control
      {...props}
      className={tw(
        'w-full h-[54px] px-4 rounded-xl bg-surface-200 text-neutral-600 font-medium placeholder-neutral-600/40 shadow-none outline-none focus:outline-none border border-transparent',
        error
          ? 'ring-2 ring-red-500'
          : props.isFocused
            ? 'ring-2 focus:ring-primary-500 focus:border-primary-500'
            : '',
        error ? 'pl-12' : icon ? 'pl-12' : 'pl-4',
        tws?.control
      )}
    >
      {error && (
        <Tooltip content={error} side='top'>
          <div className={tw('absolute top-3 left-3 flex items-center justify-center z-10')}>
            <Icon name='warning' className={tw('text-red-500 cursor-pointer')} size='sm' />
          </div>
        </Tooltip>
      )}

      {icon && (
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary-500'>{icon}</span>
      )}

      {props.children}
    </components.Control>
  )
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const { tws } = useSelectContext()

  return (
    <components.DropdownIndicator
      {...props}
      className={tw(
        'text-neutral-600/40',
        props.isFocused && 'text-primary-500',
        tws?.dropdownIndicator
      )}
    />
  )
}

const Input = (props: InputProps) => {
  const { tws } = useSelectContext()

  return (
    <components.Input
      {...props}
      className={tw('text-neutral-600 font-medium focus:outline-none', tws?.input)}
    />
  )
}

const NoOptionsMessage = () => {
  const t = useTranslations('components.select')

  return <div className='p-4 text-neutral-600/60 font-medium'>{t('noOptions')}</div>
}

export const Select = ({ custom, label, errorMessage, ...props }: ISelectProps) => {
  const contextData = { ...custom, error: errorMessage }
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className='flex flex-col'>
      {label && (
        <label
          htmlFor={selectId}
          className='block text-xs font-black text-neutral-600/50 mb-2 uppercase tracking-widest'
        >
          {label}
        </label>
      )}

      <SelectProvider {...contextData}>
        <ReactSelect
          {...props}
          id={selectId}
          unstyled
          components={{
            Control,
            Menu,
            Input,
            MenuList,
            Option,
            Placeholder,
            SingleValue,
            NoOptionsMessage,
            DropdownIndicator
          }}
        />
      </SelectProvider>
    </div>
  )
}
