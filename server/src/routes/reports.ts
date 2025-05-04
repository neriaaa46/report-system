import { Router } from 'express'
import {verifyAuthToken} from "../middlewares/verifyAuthToken"
import {verifyManagerRole} from "../middlewares/verifyManagerRole"
import {
    getReportByEmployeeAndDate,
    getEmployeesReportsForManager,
    createReport,
    updateReport
} from "../controllers/reports"

const router = Router()

router.get('/getReport', verifyAuthToken, getReportByEmployeeAndDate)

router.post('/addReport',verifyAuthToken, createReport)

router.put('/updateReport/:id', verifyAuthToken, updateReport)

router.get('/employeesReports',verifyAuthToken, verifyManagerRole, getEmployeesReportsForManager)

export default router
