import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import env  from '../env'
import {getUserByEmail, PopulatedEmployee} from '../DAL/user'
import {buildUserResponse} from "../utils/aggregators"
import {setAuthTokenCookie} from "../utils/JWT"

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' })
        return
    }

    try {
        const user: PopulatedEmployee | null = await getUserByEmail(email)

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' })
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.userId.password)

        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid email or password' })
            return
        }

        const resData = buildUserResponse(user)
        setAuthTokenCookie(res, resData)
        res.status(200).json({ message: 'Login successful', user: resData })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}


export async function getAuthenticatedUser (req: Request, res: Response): Promise<void>{
    try {
        if (!req.user || !req.user.email) {
            res.status(400).json({ message: 'Invalid user' })
            return
        }

        const user: PopulatedEmployee | null = await getUserByEmail(req.user.email)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        const resData = buildUserResponse(user)
        res.status(200).json({ user: resData })

    } catch (error) {
        console.error('Error fetching authenticated user:', error)
        res.status(500).json({ message: 'Server error' })
    }
}


export const logout = (req: Request, res: Response) => {
    const isProduction = env.NODE_ENV === 'production'

    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
    })

    res.status(200).json({ message: 'Logged out successfully' })
}
