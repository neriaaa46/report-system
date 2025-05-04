import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import env from "../env"

interface IAuthPayload {
    userId: string
    isManager: boolean
    email: string
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: IAuthPayload;
    }
}

export function verifyAuthToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    if (!token) {
        res.status(401).json({
            message: 'Authentication required: No token provided'
        })
        return
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET)

        if (typeof decoded === 'string' || !decoded) {
            res.status(401).json({
                message: 'Invalid authentication token format'
            })
            return
        }

        req.user = decoded as IAuthPayload
        next()

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({message: 'Invalid authentication token'})
            return

        } else if (error instanceof jwt.TokenExpiredError) {
           res.status(401).json({message: 'Authentication token has expired'})
            return
        }
        res.status(500).json({message: 'Authentication error'})
        return
    }
}