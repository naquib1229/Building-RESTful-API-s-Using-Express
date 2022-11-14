//Route Parameters
//In order to get a single course, you should include the ID of the course in the url so our endpoint should be like this
// /api/courses/1
// 1 is the ID of the course



const express = require('express'); 
const app = express(); 



app.get('/', (req,res)=>  
                 {
                    res.send('Hello world !!!');
                 });
                 
app.get('/api/courses', (req,res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
})

//PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));



