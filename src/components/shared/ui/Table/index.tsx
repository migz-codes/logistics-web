'use client'

import type { IComponentProps } from '@/types/react.types'
import { tw } from '@/utils/tailwind'

export function TableWrapper({ children, className }: IComponentProps) {
  return <div className={tw('overflow-x-auto', className)}>{children}</div>
}

export function Table({ children, className }: IComponentProps) {
  return <table className={tw('w-full', className)}>{children}</table>
}

export function TableHeader({ children, className }: IComponentProps) {
  return <thead className={tw('', className)}>{children}</thead>
}

export function TableBody({ children, className }: IComponentProps) {
  return <tbody className={tw('', className)}>{children}</tbody>
}

export function TableRow({ children, className }: IComponentProps) {
  return (
    <tr className={tw('border-b border-neutral-100 text-sm text-neutral-600', className)}>
      {children}
    </tr>
  )
}

export function TableCell({ children, className }: IComponentProps) {
  return <td className={tw('py-3 px-4', className)}>{children}</td>
}

export function TableHeaderTitle({ children, className }: IComponentProps) {
  return (
    <th className={tw('text-left py-3 px-4 text-sm font-semibold text-neutral-600', className)}>
      {children}
    </th>
  )
}

export { TablePagination } from './TablePagination'
