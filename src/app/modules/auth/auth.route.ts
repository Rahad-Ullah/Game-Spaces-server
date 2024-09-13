import { Router } from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from '../user/user.validation'
import { authValidation } from './auth.validation'

const router = Router()

// sign-up
router.post(
  '/signup',
  validateRequest(userValidation.userValidationSchema),
  AuthControllers.signUp,
)

// login
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  AuthControllers.login,
)

export const AuthRoutes = router
