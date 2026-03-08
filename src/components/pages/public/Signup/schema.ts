import { z } from 'zod'

export const signupSchema = z
  .object({
    name: z.string().min(1, 'fieldRequired'),
    email: z.string().min(1, 'fieldRequired').email('invalidEmail'),
    password: z.string().min(1, 'fieldRequired').min(6, 'passwordMinLength'),
    confirmPassword: z.string().min(1, 'fieldRequired'),
    acceptTerms: z.boolean().refine((val) => val === true, 'termsRequired')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordsDoNotMatch',
    path: ['confirmPassword']
  })

export type SignupFormData = z.infer<typeof signupSchema>
