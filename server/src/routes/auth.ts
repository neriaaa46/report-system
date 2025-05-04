import { Router } from 'express'
import {verifyAuthToken} from "../middlewares/verifyAuthToken"
import {getAuthenticatedUser, login, logout} from "../controllers/authUser"

const router = Router()

router.post('/login', login)

router.get('/validate', verifyAuthToken, getAuthenticatedUser)

router.post('/logout', logout)

export default router
