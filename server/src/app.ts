import express from 'express'
import cors from 'cors'
import path from "node:path"
import env from "./env"
import cookieParser from 'cookie-parser'
import connectMongoDB from "./database/connectMongoDB"
import indexRouter from './routes/index'
import authRouter from './routes/auth'
import reportRouter from './routes/reports'

const app = express()
connectMongoDB()
app.use(express.static(path.join(__dirname, '../client/dist')))

const corsOptions: cors.CorsOptions = {
    credentials: true
}
if(env.NODE_ENV === "development") {
    corsOptions.origin = "http://localhost:3000"
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../client/dist')))

app.use('/api/', indexRouter)
app.use('/api/auth', authRouter)
app.use('/api/reports', reportRouter)

const port = env.PORT

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
