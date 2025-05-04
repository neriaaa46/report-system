import { Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../env'

interface IPayload {
    userId: string
    isManager: boolean
    email: string
}

export function setAuthTokenCookie(res: Response, {userId, isManager, email}: IPayload): void {
    const isProduction = env.NODE_ENV === 'production'

    const token = jwt.sign({userId, isManager, email}, env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}