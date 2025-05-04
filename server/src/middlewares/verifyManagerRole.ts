import { Request, Response, NextFunction } from 'express'

export function verifyManagerRole(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized: Missing user data' })
        return
    }

    if (!req.user.isManager) {
        res.status(403).json({ message: 'Access denied: Manager role required' })
        return
    }

    next()
}
