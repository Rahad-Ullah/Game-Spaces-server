/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
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
import mongoose from 'mongoose'
import config from '../../config'
const SSLCommerzPayment = require('sslcommerz-lts')

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

  // generate unique transection id
  const tran_id = new mongoose.Types.ObjectId().toString()

  // set traxID to payload
  payload.trxID = tran_id

  // SSL commerz initial data
  const paymentData = {
    total_amount: payableAmount,
    currency: 'USD',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `${config.server_url}/payment/success/${tran_id}`,
    fail_url: `${config.server_url}/payment/fail/${tran_id}`,
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: facilityObj.name,
    product_category: 'Sports Facility',
    product_profile: 'general',
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address,
    cus_add2: user.address,
    cus_city: user.address,
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: user.phone,
    cus_fax: '01711111111',
    ship_name: user.name,
    ship_add1: user.address,
    ship_add2: user.address,
    ship_city: user.address,
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  }

  // retrieve payment credentials
  const store_id = config.store_id
  const store_passwd = config.store_passwd
  const is_live = false

  // init sslcz
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  const result = await sslcz.init(paymentData).then((apiResponse: any) => {
    const GatewayPageURL = apiResponse.GatewayPageURL

    return { url: GatewayPageURL }
  })
  // create booking if initialization successful
  if (result?.url) {
    await Booking.create(payload)
  }

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
