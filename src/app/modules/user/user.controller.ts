import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// get all users
const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const role = req.query?.role as string | undefined

    const result = await UserServices.getAllUsersFromDB(role || '')

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users retrieved Successfully',
      data: result,
    })
  },
)

export const UserControllers = { getAllUsers }
