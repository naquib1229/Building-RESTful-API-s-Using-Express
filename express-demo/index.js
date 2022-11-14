//Building your First Web server.

const express = require('express'); //return function
const app = express(); //function called return object by convention we call it app

//app.get();
//app.post();
//app.put();
//app.delete();
//all these methods correspond with http verbs

app.get('/', (req,res)=>   //first argument url/endpoint here '/' represents root and 2nd callback function with two arguments req, res
                 {
                    res.send('Hello world');
                 });
                 
app.get('/api/courses', (req,res) => {
    res.send([1,2,3]);
});
app.listen(3000, () => console.log('Listening on port 3000 ...'));

