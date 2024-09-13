import { Router } from 'express'
import { BookingControllers } from './booking.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidation } from './booking.validation'

const router = Router()

// create new booking
router.post(
  '/',
  auth('user'),
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
)

// retrieve bookings by specific user
router.get('/:user', auth('user'), BookingControllers.getBookingsByUser)

// retrieve all bookings
router.get('/', auth('admin'), BookingControllers.getAllBookings)

// cancel booking
router.delete('/:id', auth('user'), BookingControllers.cancelBooking)

export const BookingRoutes = router
