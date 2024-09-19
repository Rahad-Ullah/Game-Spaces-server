import { Router } from 'express'
import { PaymentControllers } from './payment.controller'
import auth from '../../middlewares/auth'

const router = Router()

// handle payment if successful
router.post('/success/:trxID', PaymentControllers.handlePaymentSuccess)

// handle payment if fail
router.post('/fail/:trxID', PaymentControllers.handlePaymentFail)

// retrieve booking by trxID
router.get('/:trxID', auth('user'), PaymentControllers.getBooking)

export const PaymentRoutes = router
