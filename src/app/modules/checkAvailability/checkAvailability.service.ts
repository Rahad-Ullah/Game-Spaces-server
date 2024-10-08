import { Booking } from '../booking/booking.model'
import { findAvailableTimeSlots } from './checkAvailability.utils'

const checkAvailability = async (date: string, facilityId: string) => {
  const bookings = await Booking.find({ date, facility: facilityId }).select(
    'startTime endTime',
  )

  const totalAvailableSlots = { startTime: '00:00', endTime: '24:00' }
  const availableSlots = findAvailableTimeSlots(bookings, totalAvailableSlots)

  return availableSlots
}

export const CheckAvailabilityServices = {
  checkAvailability,
}
