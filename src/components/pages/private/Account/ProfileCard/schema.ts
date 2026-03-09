import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'fieldRequired'),
  email: z.string().min(1, 'fieldRequired').email('invalidEmail')
})

export type ProfileFormData = z.infer<typeof profileSchema>

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'fieldRequired'),
    newPassword: z.string().min(1, 'fieldRequired').min(6, 'passwordMinLength'),
    confirmPassword: z.string().min(1, 'fieldRequired')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'passwordsDoNotMatch',
    path: ['confirmPassword']
  })

export type PasswordFormData = z.infer<typeof passwordSchema>
