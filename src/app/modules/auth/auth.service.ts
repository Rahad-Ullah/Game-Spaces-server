import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils'
import config from '../../config'

// sign-up
const signUpUserIntoDB = async (payload: TUser) => {
  const { email } = payload
  // check if the user already exist
  const user = await User.findOne({ email })
  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'User already registered')
  }

  const result = await User.create(payload)

  // send response without password
  const userResponse = {
    ...result.toObject(),
    password: undefined,
  }
  delete userResponse.password

  return userResponse
}

// login
const loginUserIntoDB = async (payload: TUser) => {
  const { email, password } = payload

  // check if the user exist
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  // verify password
  const verify = await bcrypt.compare(password, user?.password)
  if (!verify) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect password!')
  }

  // generate jwt token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  // send response without password
  const userResponse = {
    ...user.toObject(),
    password: undefined,
  }
  delete userResponse.password

  return {
    userResponse,
    accessToken,
  }
}

export const AuthServices = {
  signUpUserIntoDB,
  loginUserIntoDB,
}
