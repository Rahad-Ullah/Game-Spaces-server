import { Request, RequestHandler, Response } from 'express'
import { AuthServices } from './auth.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import config from '../../config'

// signup
const signUp: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthServices.signUpUserIntoDB(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User registered successfully',
      data: result,
    })
  },
)

// login
const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthServices.loginUserIntoDB(req.body)
    const { accessToken, userResponse: user } = result

    res.cookie('accessToken', accessToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
    })

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User logged in successfully',
      token: accessToken,
      data: user,
    })
  },
)

export const AuthControllers = {
  signUp,
  login,
}
