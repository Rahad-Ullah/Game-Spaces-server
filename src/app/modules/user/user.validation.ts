import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['user', 'admin']),
    phone: z.string({ required_error: 'Phone is required' }),
    address: z.string({ required_error: 'Address is required' }),
  }),
})

export const userValidation = {
  userValidationSchema,
}
