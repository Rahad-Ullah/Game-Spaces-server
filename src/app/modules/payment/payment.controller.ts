import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { PaymentServices } from './payment.service'

// handle payment successful
const handlePaymentSuccess: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { trxID } = req.params

    const result = await PaymentServices.updateBookingInDB(trxID)

    // redirect frontend to a success page
    res.redirect(`http://localhost:5173/payment/success/${trxID}`)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Payment Successful',
      data: result,
    })
  },
)

// handle payment fail
const handlePaymentFail: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { trxID } = req.params

    const result = await PaymentServices.deleteBookingFromDB(trxID)

    // redirect frontend to a fail page
    res.redirect(`http://localhost:5173/payment/fail/${trxID}`)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking cancelled  successfully',
      data: result,
    })
  },
)

// retrieve booking data by trxID
const getBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { trxID } = req.params
    const { _id: userId } = req.user

    const result = await PaymentServices.getBookingFromDB(trxID, userId)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking retrieved  successfully',
      data: result,
    })
  },
)

export const PaymentControllers = {
  handlePaymentSuccess,
  handlePaymentFail,
  getBooking,
}
