import { User } from './user.model'

const getAllUsersFromDB = async (role: string) => {
  if (role) {
    const result = await User.find({ role: role })
    return result
  }

  const result = await User.find()
  return result
}

export const UserServices = {
  getAllUsersFromDB,
}
