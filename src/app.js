import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'


import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import loginRoutes from './routes/LogIn.routes.js'
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/User.routes.js'
import products from './routes/Products.routes.js'
import insumos from './routes/Insumos.routes.js'
import sales from './routes/Sales.routes.js'
import reports from './routes/Reports.routes.js'
import ordenes from './routes/PurchaseOrders.routes.js'

// Initializations
const app = express()


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

// Routes
app.use('/', indexRoutes);
app.use('/api/', loginRoutes);
app.use('/api/dashboard/', userRoutes);
app.use('/api/dashboard/', products);
app.use('/api/dashboard/', insumos);
app.use('/api/dashboard/', sales);
app.use('/api/dashboard/', reports);
app.use('/api/dashboard/', ordenes);


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'))

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;