import {PopulatedEmployee} from "../DAL/user"

export function buildUserResponse (user: PopulatedEmployee) {
    return {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isManager: user.userId.isManager,
        email: user.userId.email,
        manager: user.managerId ? {
            firstName: user.managerId.firstName,
            lastName: user.managerId.lastName,
            role: user.managerId.role,
            managerId: user.managerId._id
        } : null
    }
}
