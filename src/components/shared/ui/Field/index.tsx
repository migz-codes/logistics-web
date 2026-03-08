'use client'

import type { ReactNode } from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Icon } from '@/components/shared/ui/Icon'
import { Tooltip } from '@/components/shared/ui/Tooltip'
import { tw } from '@/utils/tailwind'

interface FieldTws {
  wrapper?: string
  label?: string
  required?: string
  inputWrapper?: string
  leftIconWrapper?: string
  leftIcon?: string
  errorIcon?: string
  input?: string
  rightIconWrapper?: string
  passwordToggle?: string
  passwordIcon?: string
}

interface FieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  register?: UseFormRegister<T>
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  id?: string
  leftIcon?: string
  rightIcon?: ReactNode
  showPassword?: boolean
  onTogglePassword?: () => void
  className?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  tws?: FieldTws
}

export function Field<T extends FieldValues = FieldValues>({
  tws,
  name,
  register,
  label,
  leftIcon,
  rightIcon,
  id = name,
  placeholder,
  showPassword,
  errorMessage,
  type = 'text',
  className = '',
  onTogglePassword,
  disabled = false,
  required = false
}: FieldProps<T>) {
  const inputType = type === 'password' && showPassword ? 'text' : type

  console.log('errorMessage', errorMessage)

  return (
    <div className={tw('flex flex-col', tws?.wrapper)}>
      <label
        htmlFor={id}
        className={tw('block text-sm font-bold text-neutral-600 mb-2', tws?.label)}
      >
        {label}
        {required && <span className={tw('text-red-500 ml-1', tws?.required)}>*</span>}
      </label>

      <div className={tw('relative', tws?.inputWrapper)}>
        {leftIcon && (
          <div
            className={tw(
              'absolute inset-y-0 left-0 pl-4 flex items-center justify-center',
              !errorMessage && 'pointer-events-none',
              tws?.leftIconWrapper
            )}
          >
            {errorMessage ? (
              <Tooltip content={errorMessage} side='top'>
                <span
                  className={tw('flex items-center justify-center cursor-pointer', tws?.errorIcon)}
                >
                  <Icon name='warning' className='text-red-500' size='sm' />
                </span>
              </Tooltip>
            ) : (
              <Icon
                name={leftIcon}
                className={tw('text-neutral-600/40', tws?.leftIcon)}
                size='sm'
              />
            )}
          </div>
        )}

        <input
          id={id}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          {...(register ? register(name) : {})}
          className={tw(
            'w-full py-3 rounded-xl bg-white border transition-all text-sm',
            errorMessage
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-primary-500/10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            className,
            leftIcon ? 'pl-12' : 'pl-4',
            rightIcon ? 'pr-12' : 'pr-4',
            tws?.input
          )}
        />

        {rightIcon && (
          <div
            className={tw(
              'absolute inset-y-0 right-0 pr-4 flex items-center justify-center',
              tws?.rightIconWrapper
            )}
          >
            {rightIcon}
          </div>
        )}

        {type === 'password' && onTogglePassword && (
          <button
            type='button'
            onClick={onTogglePassword}
            className={tw(
              'absolute inset-y-0 right-0 pr-4 flex items-center justify-center',
              tws?.passwordToggle
            )}
          >
            <Icon
              size='sm'
              name={showPassword ? 'visibility_off' : 'visibility'}
              className={tw('text-neutral-600/40 hover:text-neutral-600', tws?.passwordIcon)}
            />
          </button>
        )}
      </div>
    </div>
  )
}
