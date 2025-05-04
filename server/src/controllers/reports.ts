import { Request, Response } from 'express'
import {
    createReportInDb,
    updateReportInDb,
    getReportsByManager,
    findReportByEmployeeAndDate
} from '../DAL/reports'


export async function getReportByEmployeeAndDate(req: Request, res: Response): Promise<void> {
    try {
        if (!req.user || !req.user.userId) {
            res.status(400).json({ message: 'Invalid user' })
            return
        }

        const employeeId: string = req.user.userId
        const { date } = req.query

        if (!date) {
           res.status(400).json({ message: 'Missing date parameter' })
            return
        }

        const report = await findReportByEmployeeAndDate(employeeId, date as string)
        res.status(200).json(report)
    } catch (error) {
        console.error('Error fetching report:', error)
        res.status(500).json({ message: 'Failed to get report' })
    }
}


export async function createReport (req: Request, res: Response): Promise<void> {
    if (!req.user || !req.user.userId) {
        res.status(400).json({ message: 'Invalid user' })
        return
    }
    const employeeId = req.user.userId
    const { clockIn } = req.body

    if (!clockIn) {
        res.status(400).json({ message: 'Missing clock-in field' })
        return
    }

    try {
        const newReport = await createReportInDb({employeeId, clockIn})
        res.status(201).json({ message: 'Report created successfully', report: newReport })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create report' })
    }
}


export const updateReport = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const updateData = req.body

    if (!id) {
        res.status(400).json({ message: 'Missing report ID' })
        return
    }

    try {
        const updatedReport = await updateReportInDb(id, updateData)

        if (!updatedReport) {
            res.status(404).json({ message: 'Report not found' })
            return
        }

        res.status(200).json({ message: 'Report updated successfully', report: updatedReport })
    } catch (error) {
        console.error(error)
        if (error instanceof Error && error.message === 'Cannot update clock times when status is not pending') {
            res.status(403).json({ message: 'Cannot update clock times when report status is not pending' })
            return
        }

        res.status(500).json({ message: 'Failed to update report' })
    }
}


export async function getEmployeesReportsForManager(req: Request, res: Response): Promise<void> {
    if (!req.user || !req.user.userId) {
        res.status(400).json({ message: 'Invalid user' })
        return
    }

    const managerId = req.user.userId
    const { date } = req.query

    if (!date) {
        res.status(400).json({ message: 'Missing date parameter' })
        return
    }

    try {
        const reports = await getReportsByManager(managerId, date as string)
        res.status(200).json({ reports })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to get reports' })
    }
}


