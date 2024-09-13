import { JwtPayload } from 'jsonwebtoken'
import { TBooking } from './booking.interface'
import { Booking } from './booking.model'
import { Facility } from '../facility/facility.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import {
  calculatePayableAmout,
  isEndTimeBeforeStartTime,
  isTimeSlotAvailable,
} from './booking.utils'

// create new bookin into DB
const createBookingIntoDB = async (user: JwtPayload, payload: TBooking) => {
  const { date, startTime, endTime, facility } = payload

  // check if the facility exist
  const facilityObj = await Facility.findById(facility)
  if (!facilityObj) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This facility is not exist')
  }

  // check if end time before start time
  if (isEndTimeBeforeStartTime(startTime, endTime)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'StartTime should be before EndTime',
    )
  }

  // check if the time slot is available
  const assignedTimeSlots = await Booking.find({
    facility,
    date,
  }).select('date startTime endTime')

  const newTimeSlot = {
    date,
    startTime,
    endTime,
  }

  if (isTimeSlotAvailable(assignedTimeSlots, newTimeSlot)) {
    throw new AppError(httpStatus.CONFLICT, 'Time slot is not available')
  }

  // calculate payable amount
  const payableAmount = calculatePayableAmout(
    date,
    startTime,
    endTime,
    facilityObj?.pricePerHour,
  )

  // set payableAmount to the payload
  payload.payableAmount = payableAmount

  // set current user to payload
  payload.user = user._id

  const result = await Booking.create(payload)
  return result
}

// retrieve all bookings
const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('user').populate('facility')
  return result
}

// retrieve bookings by user
const getBookingsByUserFromDB = async (user: string) => {
  const result = await Booking.find({ user }).populate('facility')
  return result
}

// cancel booking
const cancelBookingFromDB = async (id: string, userId: string) => {
  // check if the booking is exist
  const isBookingExist = await Booking.findById(id)
  if (!isBookingExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This booking is not exist')
  }

  // check if the user of booking and requested user is same
  if (!isBookingExist.user.equals(userId)) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'This booking is created by others. You can not cancel this booking.',
    )
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  ).populate('facility')
  return result
}

export const BookingServices = {
  createBookingIntoDB,
  getBookingsByUserFromDB,
  getAllBookingsFromDB,
  cancelBookingFromDB,
}
