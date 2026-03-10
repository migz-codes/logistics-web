'use client'

import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Icon } from '@/components/shared/ui/Icon'
import { Tooltip } from '@/components/shared/ui/Tooltip'
import { tw } from '@/utils/tailwind'

interface FieldTextareaTws {
  textarea?: string
  label?: string
  wrapper?: string
  required?: string
  errorIcon?: string
  textareaWrapper?: string
  errorIconWrapper?: string
}

export interface FieldTextareaProps<T extends FieldValues = FieldValues> {
  id?: string
  name: Path<T>
  label: string
  tws?: FieldTextareaTws
  disabled?: boolean
  required?: boolean
  placeholder?: string
  rows?: number
  errorMessage?: string
  register?: UseFormRegister<T>
}

export function FieldTextarea<T extends FieldValues = FieldValues>({
  tws,
  name,
  label,
  register,
  id = name,
  placeholder,
  rows = 3,
  errorMessage,
  disabled = false,
  required = false
}: FieldTextareaProps<T>) {
  return (
    <div className={tw('flex flex-col', tws?.wrapper)}>
      <label
        htmlFor={id}
        className={tw(
          'block text-xs font-black text-neutral-600/50 mb-2 uppercase tracking-widest',
          tws?.label
        )}
      >
        {label}

        {required && <span className={tw('text-red-500 ml-1', tws?.required)}>*</span>}
      </label>

      <div className={tw('relative', tws?.textareaWrapper)}>
        {errorMessage && (
          <Tooltip content={errorMessage} side='left'>
            <div
              className={tw(
                'absolute top-3 left-3 flex items-center justify-center z-10',
                tws?.errorIconWrapper
              )}
            >
              <Icon
                size='sm'
                name='warning'
                className={tw('text-red-500 cursor-pointer', tws?.errorIcon)}
              />
            </div>
          </Tooltip>
        )}

        <textarea
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          {...(register ? register(name) : {})}
          className={tw(
            'w-full py-3 rounded-xl bg-surface-200 text-neutral-600 font-medium placeholder-neutral-600/40 resize-none outline-none focus:outline-none',
            errorMessage ? 'pl-12 ring-2 ring-red-500' : 'pl-4 focus:ring-2 focus:ring-primary-500',
            tws?.textarea
          )}
        />
      </div>
    </div>
  )
}
