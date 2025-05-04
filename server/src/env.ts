import { cleanEnv, str } from 'envalid'
import dotenv from 'dotenv'
dotenv.config()

const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
    MONGO_CONNECTION_URI: str(),
    JWT_SECRET: str(),
    PORT: str(),
})

export default env