// Structuring Express Application
//


const debug = require('debug')('app:startup');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express'); 
const app = express(); 

app.set('view engine', 'pug'); //express internally load pug no need of require
app.set('views', './views'); //optional and default ./views is the location where all views are stored

app.use(helmet());
app.use('/api/courses', courses);
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Configuration
console.log('Application Name ' + config.get('name'));
console.log('Mail Server  ' + config.get('mail.host'));
console.log('Mail Password  ' + config.get('mail.password') );

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));  
  debug('Morgan enabled....');
}
               


//PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));