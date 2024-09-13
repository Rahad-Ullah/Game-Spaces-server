import { TSlot } from './checkAvailability.interface'

// get todays date
export const getTodaysDate = () => {
  const today = new Date()

  // extract year, month, and day
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0')

  // format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export const findAvailableTimeSlots = (
  bookings: TSlot[],
  totalAvailableSlots: TSlot,
) => {
  const availableSlots: TSlot[] = []

  // sort bookings in accending order
  bookings.sort((a, b) => a.startTime.localeCompare(b.startTime))

  let lastEndTime = '00:00'

  bookings.forEach((booking) => {
    if (lastEndTime < booking.startTime) {
      availableSlots.push({
        startTime: lastEndTime,
        endTime: booking.startTime,
      })
    }
    lastEndTime = booking.endTime > lastEndTime ? booking.endTime : lastEndTime
  })

  if (lastEndTime < totalAvailableSlots.endTime) {
    availableSlots.push({
      startTime: lastEndTime,
      endTime: totalAvailableSlots.endTime,
    })
  }
  return availableSlots
}
