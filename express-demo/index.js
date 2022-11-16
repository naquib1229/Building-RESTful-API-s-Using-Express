//Input Validation
// You should never ever trust what client input sends to you.
//You should always validate it.

const Joi = require('joi');
const express = require('express'); 
const app = express(); 

app.use(express.json()); 

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
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema)
    

    if(result.error) {
        //400 Bad Request
        res.status(400).send(result.error);
        return;
    }
    
    const course = {
        id: courses.length + 1 ,
        name: req.body.name
    };
    courses.push(course);
    
    res.send(course);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given ID was not found');
    res.send(course);
}); 



//PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));