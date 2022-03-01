console.log('starting our server');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
//const api = require('./api')
const api = require('./routes/api')

app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors())
app.use('/api', api);

app.listen(port, function(){
    console.log(`my fucken port is: ${port}`)
})