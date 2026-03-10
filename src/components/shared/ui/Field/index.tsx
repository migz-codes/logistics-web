'use client'

import type { ReactNode } from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Icon } from '@/components/shared/ui/Icon'
import { Tooltip } from '@/components/shared/ui/Tooltip'
import { TInputProps } from '@/types/react.types'
import { tw } from '@/utils/tailwind'

interface FieldTws {
  input?: string
  label?: string
  wrapper?: string
  required?: string
  leftIcon?: string
  errorIcon?: string
  passwordIcon?: string
  inputWrapper?: string
  passwordToggle?: string
  leftIconWrapper?: string
  rightIconWrapper?: string
  errorIconWrapper?: string
}

export interface FieldProps<T extends FieldValues = FieldValues> {
  id?: string
  name: Path<T>
  label: string
  tws?: FieldTws
  leftIcon?: string
  disabled?: boolean
  required?: boolean
  className?: string
  placeholder?: string
  rightIcon?: ReactNode
  errorMessage?: string
  showPassword?: boolean
  register?: UseFormRegister<T>
  onTogglePassword?: () => void
  onChange?: TInputProps['onChange']
  type?: 'text' | 'email' | 'password'
}

export function Field<T extends FieldValues = FieldValues>({
  tws,
  name,
  label,
  register,
  onChange,
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
        {(errorMessage || leftIcon) && (
          <div
            className={tw(
              'absolute inset-y-0 left-0 pl-4 flex items-center justify-center',
              !errorMessage && 'pointer-events-none',
              tws?.leftIconWrapper
            )}
          >
            {errorMessage && (
              <Tooltip content={errorMessage} side='top'>
                <div
                  className={tw(
                    'flex items-center justify-center cursor-pointer',
                    tws?.errorIconWrapper
                  )}
                >
                  <Icon name='warning' className={tw('text-red-500', tws?.errorIcon)} size='sm' />
                </div>
              </Tooltip>
            )}

            {!errorMessage && leftIcon && (
              <Icon
                size='sm'
                name={leftIcon}
                className={tw('text-neutral-600/40', tws?.leftIcon)}
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
            leftIcon || errorMessage ? 'pl-12' : 'pl-4',
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
