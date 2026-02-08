import { twMerge } from 'tailwind-merge'

type ClassValue = string | undefined | null | false | ClassValue[]

function clsx(...inputs: ClassValue[]): string {
    return inputs
        .flat()
        .filter((x): x is string => typeof x === 'string' && x.length > 0)
        .join(' ')
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs))
}
