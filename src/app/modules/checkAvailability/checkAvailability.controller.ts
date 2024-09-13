import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { CheckAvailabilityServices } from './checkAvailability.service'
import { getTodaysDate } from './checkAvailability.utils'

// check Time slots availability
const checkAvailability: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const today = getTodaysDate()
    let date = today

    // set date if date provide as query
    if (req.query?.date) {
      date = req.query?.date as string
    }

    const result = await CheckAvailabilityServices.checkAvailability(date)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Availability checked successfully',
      data: result,
    })
  },
)

export const CheckAvailabilityControllers = {
  checkAvailability,
}
