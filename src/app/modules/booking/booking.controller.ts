import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { BookingServices } from './booking.service'

// create a new booking
const createBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user

    const result = await BookingServices.createBookingIntoDB(user, req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking created successfully',
      data: result,
    })
  },
)

// retrieve all bookings
const getAllBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookingServices.getAllBookingsFromDB()

    if (!result.length) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'No Data Found',
        data: result,
      })
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Bookings retrieved successfully',
      data: result,
    })
  },
)

// retrieve bookings by specific user
const getBookingsByUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.params

    const result = await BookingServices.getBookingsByUserFromDB(user)

    if (!result.length) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'No Data Found',
        data: result,
      })
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Bookings retrieved successfully',
      data: result,
    })
  },
)

// cancel booking
const cancelBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { _id: userId } = req.user
    const { id } = req.params

    const result = await BookingServices.cancelBookingFromDB(id, userId)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking cancelled  successfully',
      data: result,
    })
  },
)

export const BookingControllers = {
  createBooking,
  getBookingsByUser,
  getAllBookings,
  cancelBooking,
}
