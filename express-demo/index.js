//Nodemon

const express = require('express'); 
const app = express(); 



app.get('/', (req,res)=>  
                 {
                    res.send('Hello world !!!');
                 });
                 
app.get('/api/courses', (req,res) => {
    res.send([1,2,3]);
});
app.listen(3000, () => console.log('Listening on port 3000 ...'));

//npm i -g nodemon
//Nodemon is a utility depended on about 3 million projects, that will monitor for any changes in your source and automatically restart your server.
//nodemon indes.js

