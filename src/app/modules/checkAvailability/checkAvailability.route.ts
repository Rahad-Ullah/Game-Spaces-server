import { Router } from 'express'
import { CheckAvailabilityControllers } from './checkAvailability.controller'

const router = Router()

// check Time Slot availability
router.get('/', CheckAvailabilityControllers.checkAvailability)

export const CheckAvailabilityRoutes = router
