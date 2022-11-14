//Route Parameters
//In order to get a single course, you should include the ID of the course in the url so our endpoint should be like this
// /api/courses/1
// 1 is the ID of the course
//query string parameter
//http://localhost:3000/api/courses/2018/1?sortBy=name
//  2018/1 is route parameter for essential or required values
//?sortBy=name is query string parameter which is optional, we use this for providing additional data to backend service.


const express = require('express'); 
const app = express(); 



app.get('/', (req,res)=>  
                 {
                    res.send('Hello world !!!');
                 });
                 
app.get('/api/courses', (req,res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
})

//PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));



