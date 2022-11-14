//Environment variable
//Now one thing is need to improve the hard coded port value 3000 unlikely to work in production evironment.
//Because when deploy this application to a hosting environment the port is dynamically assigned by the hosting environment.
//so can't rely on 3000 available.
//Way to fix this is Environment Variable.
// An environment variable is basically a variable that is a part of the environment in which a process run.
//Its value is set outside this application.
//export PORT=5000

const express = require('express'); 
const app = express(); 



app.get('/', (req,res)=>  
                 {
                    res.send('Hello world !!!');
                 });
                 
app.get('/api/courses', (req,res) => {
    res.send([1,2,3]);
});

//PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));



