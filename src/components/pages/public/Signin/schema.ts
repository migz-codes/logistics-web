import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().min(1, 'fieldRequired').email('invalidEmail'),
  password: z.string().min(1, 'fieldRequired')
})

export type SigninFormData = z.infer<typeof signinSchema>
