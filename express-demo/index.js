// Debugging
//generally we use console.log for debugging but afterward we either delete or comment out these console.log
//but if we need to debugging again we have to write those console.log again which is tedious task, 
//to overcome this there is package called debug which we can control them by environment variables
//npm i debug
//export DEBUG=app:startup
// for multiple debug    export DEBUG=app:startup,app:
//for all       export DEBUG=app:*
//set environment variable and run the index.js in one go
//DEBUG=app:db node index.js


const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express'); 
const app = express(); 


app.use(helmet());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Configuration
console.log('Application Name ' + config.get('name'));
console.log('Mail Server  ' + config.get('mail.host'));
console.log('Mail Password  ' + config.get('mail.password') );

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));  
  startupDebugger('Morgan enabled....');
}

//DB work..
dbDebugger('connected to the database....');

app.use(logger);

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];

app.get('/', (req,res)=>  
                 {
                    res.send('Hello world !!!');
                 });
                 
app.get('/api/courses', (req,res) => {
    res.send(courses);
}); 

app.post('/api/courses', (req,res) => {
    

    const { error } = validateCourse(req.body); //object destructuring equivalent to result.error
    if(error) return  res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1 ,
        name: req.body.name
    };
    courses.push(course);
    
    res.send(course);
});
app.put('/api/courses/:id', (req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given ID was not found');

    const { error } = validateCourse(req.body); //object destructuring equivalent to result.error
    if(error) return  res.status(400).send(error.details[0].message);
        
    //Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);

});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given ID was not found');
    res.send(course);
}); 

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given ID was not found');
     
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema)
}


//PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));