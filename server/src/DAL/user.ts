import { Employee } from '../models/employee'
import { User } from '../models/user'

export type PopulatedEmployee = {
    _id: string
    firstName: string
    lastName: string
    role: string
    userId: {
        email: string
        password: string
        isManager: boolean
    }
    managerId?: {
        _id: string
        firstName: string
        lastName: string
        role: string
    }
}

export async function getUserByEmail(email: string): Promise<PopulatedEmployee | null> {
    const user = await User.findOne({ email }).exec()
    if (!user) return null

    const employee = await Employee.findOne({ userId: user._id })
        .populate({
            path: 'userId',
            select: 'email password isManager'
        })
        .populate({
            path: 'managerId',
            select: 'firstName lastName role'
        })
        .select('firstName lastName role managerId')
        .lean()
        .exec()
    return employee as unknown as PopulatedEmployee
}