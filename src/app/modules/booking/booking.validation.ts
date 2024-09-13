import { z } from 'zod'

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/
    return regex.test(time)
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  },
)

// validation for creating new booking
const createBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string({ required_error: 'Facility is required' }),
    date: z.string({ required_error: 'Date is required' }),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  }),
})

// validation for updating exiting booking
const updateBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string({ required_error: 'Facility is required' }).optional(),
    date: z.string({ required_error: 'Date is required' }).optional(),
    startTime: timeStringSchema.optional(),
    endTime: timeStringSchema.optional(),
  }),
})

export const bookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
}
