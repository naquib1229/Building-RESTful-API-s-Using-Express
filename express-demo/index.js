// Creating custom Middleware 

const Joi = require('joi');
const express = require('express'); 
const func = require('joi/lib/types/func');
const app = express(); 

app.use(express.json()); 

app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

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