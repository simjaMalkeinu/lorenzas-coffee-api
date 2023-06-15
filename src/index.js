import app from './app.js'
import path from 'path'
import {engine} from 'express-handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {PORT} from './config.js'

// Settings
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'))

//Settings for handlebars
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Server is listening 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})