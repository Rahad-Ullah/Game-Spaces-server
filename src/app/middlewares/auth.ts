import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { TUserRole } from '../modules/user/user.interface'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/user/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check if the token is exist
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    // verify token
    let decoded
    try {
      decoded = jwt.verify(
        token as string,
        config.jwt_access_secret as string,
      ) as JwtPayload
    } catch (error) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    const { email, role } = decoded

    // check if the user exist
    const user = await User.findOne({ email })
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    // check user role and authorize
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    // decoded
    req.user = user

    next()
  })
}

export default auth
