import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import loginRoutes from './routes/LogIn.routes.js'
import indexRoutes from './routes/index.routes.js'

// Initializations
const app = express()


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

// Routes
app.use('/', indexRoutes)
app.use('/api/', loginRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;