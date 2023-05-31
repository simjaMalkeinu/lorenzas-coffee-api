import express from 'express'
import morgan from 'morgan'

import loginRoutes from './routes/LogIn.routes.js'
import indexRoutes from './routes/index.routes.js'

// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/', loginRoutes);
app.use('/api/', indexRoutes)


// Server is listening 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})