import { Schema, model, Document, Types } from 'mongoose'

export interface IEmployee extends Document {
    firstName: string
    lastName: string
    role: string
    managerId?: Types.ObjectId
    userId: Types.ObjectId
}

const employeeSchema = new Schema<IEmployee>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, required: true },
        managerId: { type: Schema.Types.ObjectId, ref: 'Employee' },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    }
)

export const Employee = model<IEmployee>('Employee', employeeSchema)
