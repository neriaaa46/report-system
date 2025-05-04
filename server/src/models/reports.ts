import {Schema, model, Document, Types} from 'mongoose'

export interface IReport extends Document {
    employeeId: Types.ObjectId
    date: Date
    clockIn?: string
    clockOut?: string
    status: 'pending' | 'approved' | 'rejected'
}

const ReportSchema = new Schema<IReport>({
    employeeId: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
    date: { type: Date, default: () => new Date() },
    clockIn: { type: String, required: false },
    clockOut: { type: String, required: false },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
})

export const Report = model<IReport>('Report', ReportSchema)
