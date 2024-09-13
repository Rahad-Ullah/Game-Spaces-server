/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessages, TGenericErrorResponse } from '../interface/error'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = Object.keys(err.keyValue).map(
    (value) => {
      return {
        path: value,
        message: `${err.keyValue[value]} is already exist`,
      }
    },
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'Duplicate Error',
    errorMessages,
  }
}

export default handleDuplicateError
