import { z } from 'zod'

// validation for creating a new facility
const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }),
    image: z.string({ required_error: 'Image link is required.' }),
    description: z.string({ required_error: 'Description is required.' }),
    pricePerHour: z.number({ required_error: 'PricePerHour is required.' }),
    location: z.string({ required_error: 'Location is required.' }),
  }),
})

// validation for updating existing facility
const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }).optional(),
    image: z.string({ required_error: 'Image is required.' }).optional(),
    description: z
      .string({ required_error: 'Description is required.' })
      .optional(),
    pricePerHour: z
      .number({ required_error: 'PricePerHour is required.' })
      .optional(),
    location: z.string({ required_error: 'Location is required.' }).optional(),
  }),
})

export const facilityValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
}
