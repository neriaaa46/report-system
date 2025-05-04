import {Report, IReport} from "../models/reports"
import {Employee, IEmployee} from "../models/employee"

export async function findReportByEmployeeAndDate(employeeId: string, date: string): Promise<IReport | null> {
    const targetDate: Date = new Date(date)
    const startOfDay: Date = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay: Date = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    return Report.findOne({
        employeeId,
        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    }).lean<IReport | null>()
}


export async function createReportInDb (reportData: { employeeId: string, clockIn: string}): Promise<IReport> {
    try {
        const report = new Report({
            ...reportData,
        })
        await report.save()
        return report
    } catch (error) {
        throw new Error('Error creating report')
    }
}


export async function updateReportInDb(
    id: string,
    updateData: Partial<{
        clockIn: string
        clockOut: string
        status: string
    }>
): Promise<IReport | null> {
    try {
        if (updateData.clockIn !== undefined || updateData.clockOut !== undefined) {
            const currentReport = await Report.findById(id)

            if (!currentReport) {
                return null
            }

            if (currentReport.status !== 'pending') {
                throw new Error('Cannot update clock times when status is not pending')
            }
        }

        return await Report.findByIdAndUpdate(id, updateData, {
            new: true,
        })
    } catch (error) {
        throw error
    }
}


export async function getReportsByManager(managerId: string, date: string): Promise<IReport[]> {
    const targetDate = new Date(date)
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    try {
        const employees: IEmployee[] = await Employee.find({ managerId })

        return await Report.find({
            employeeId: {$in: employees.map(employee => employee._id)},
            clockIn: {$exists: true},
            clockOut: {$exists: true},
            date: {$gte: startOfDay, $lte: endOfDay}
        }).populate('employeeId', 'firstName lastName role')
    } catch (error) {
        throw new Error('Failed to fetch reports')
    }
}

