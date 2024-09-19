import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { Booking } from '../booking/booking.model'

// update booking if payment successful
const updateBookingInDB = async (trxID: string) => {
  // check if the booking is exist
  const isBookingExist = await Booking.findOne({ trxID })
  if (!isBookingExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This booking is not exist')
  }

  const result = await Booking.findOneAndUpdate(
    { trxID },
    { paymentStatus: 'paid' },
    { new: true },
  ).populate('facility')
  return result
}

// delete booking if payment fail
const deleteBookingFromDB = async (trxID: string) => {
  // check if the booking is exist
  const isBookingExist = await Booking.findOne({ trxID })
  if (!isBookingExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This booking is not exist')
  }

  const result = await Booking.findOneAndDelete(
    { trxID },
    { new: true },
  ).populate('facility')
  return result
}

// retrieve booking data by trxID
const getBookingFromDB = async (trxID: string, userId: string) => {
  const result = await Booking.findOne({ trxID }).populate('facility user')

  // check if the booking is exist
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This booking is not exist')
  }

  // check if the user of booking and requested user is same
  if (!result.user.equals(userId)) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'This booking is created by others. You can not retrieve this booking.',
    )
  }

  return result
}

export const PaymentServices = {
  updateBookingInDB,
  deleteBookingFromDB,
  getBookingFromDB,
}
