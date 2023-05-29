import express from 'express'
import morgan from 'morgan'

// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));

// Routes
//app.use('/api/login', require('./routes/LogIn.routes'));


// Server is listening 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})