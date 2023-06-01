import app from './app.js'

import {PORT} from './config.js'

// Settings
app.set('port', PORT);

// Server is listening 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})