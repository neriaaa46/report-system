import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    isManager: boolean
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isManager: { type: Boolean, default: false }
    }
)

export const User = model<IUser>('User', userSchema)
