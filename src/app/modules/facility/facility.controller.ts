import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { FacilityServices } from './facility.service'

// create a new faciltiy
const createFacility: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FacilityServices.createFacilityIntoDB(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Facility added successfully',
      data: result,
    })
  },
)

// update faciltiy
const updateFacility: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await FacilityServices.updateFacilityIntoDB(id, req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Facility updated successfully',
      data: result,
    })
  },
)

// delete faciltiy
const deleteFacility: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await FacilityServices.deleteFacilityIntoDB(id)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Facility deleted successfully',
      data: result,
    })
  },
)

// retrieve all facilties
const getSingleFacility: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await FacilityServices.getSingleFacilityFromDB(id)

    if (!result) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.OK,
        message: 'No Data Found',
        data: result,
      })
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Facilities retrieved successfully',
      data: result,
    })
  },
)

// retrieve all facilties
const getAllFacilities: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FacilityServices.getAllFacilitiesFromDB()

    if (!result.length) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.OK,
        message: 'No Data Found',
        data: result,
      })
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Facilities retrieved successfully',
      data: result,
    })
  },
)

export const FacilityControllers = {
  createFacility,
  updateFacility,
  getSingleFacility,
  getAllFacilities,
  deleteFacility,
}
