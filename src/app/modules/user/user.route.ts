import { Router } from 'express'
import auth from '../../middlewares/auth'
import { UserControllers } from './user.controller'

const router = Router()

// get all users
router.get('/', auth('admin'), UserControllers.getAllUsers)

export const UserRoutes = router
