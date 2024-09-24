import { TTimeSlot } from './booking.interface'

// check if end time before end time
export const isEndTimeBeforeStartTime = (
  startTime: string,
  endTime: string,
) => {
  const start = new Date(`1970-01-01T${startTime}:00`)
  const end = new Date(`1970-01-01T${endTime}:00`)

  return start > end
}

// calculate the payable amount
export const calculatePayableAmout = (
  date: string,
  startTime: string,
  endTime: string,
  pricePerHour: number,
) => {
  // calculate the duration in hours
  const start = new Date(`${date}T${startTime}:00`)
  const end = new Date(`${date}T${endTime}:00`)
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

  const payableAmount = durationInHours * pricePerHour
  const roundedPayableAmount = Math.round(payableAmount * 100) / 100

  return roundedPayableAmount
}

// check time slot available
export const isTimeSlotAvailable = (
  assignedTimeSlots: TTimeSlot[],
  newTimeSlot: TTimeSlot,
) => {
  for (const timeSlot of assignedTimeSlots) {
    const existingStartTime = new Date(`1970-01-01T${timeSlot.startTime}`)
    const existingEndTime = new Date(`1970-01-01T${timeSlot.endTime}`)
    const newStartTime = new Date(`1970-01-01T${newTimeSlot.startTime}`)
    const newEndTime = new Date(`1970-01-01T${newTimeSlot.endTime}`)

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true
    }
  }
  return false
}
