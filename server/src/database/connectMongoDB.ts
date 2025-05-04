import mongoose from 'mongoose'
import env from '../env'

const connectMongoDB = () => {
    mongoose.connect(env.MONGO_CONNECTION_URI)
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error)
        })
}

export default connectMongoDB