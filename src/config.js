import {config} from 'dotenv'   

config()

export const PORT = process.env.PORT || 3000

export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_DATABASE = process.env.DB_DATABASE || 'lorenzascoffee'
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_HOST = process.env.DB_HOST || 'localhost'


export const DATABASE_URL = process.env.DATABASE_URL || 'mysql://kl5nq2r2bn15qxw4caoz:pscale_pw_xOsJwHxsnK6v7rrpatrBpbjaVzjKn4iqdPGtfK4yhKW@aws.connect.psdb.cloud/lorenzascoffee?ssl={"rejectUnauthorized":true}'


