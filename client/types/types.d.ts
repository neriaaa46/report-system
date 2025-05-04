export interface IUser {
    userId: string
    email: string
    firstName: string
    lastName: string
    role: string
    isManager: boolean
    manager: {
        firstName: string
        lastName: string
        role: string
        managerId: string
    }
}

export interface IAuth {
    user: IUser;
    message: string;
}

export interface IReport {
    _id: string
    clockIn: string
    clockOut: string
    date: string
    status: 'pending' | 'approved' | 'rejected'
    employeeId: {
        _id: string
        firstName: string
        lastName: string
        role: string
        managerId?: string
    }
}

export interface ICreateOrUpdateReport {
    report: IReport
    message: string
}

export interface IEmployeesReports {
    reports: IReport[]
}