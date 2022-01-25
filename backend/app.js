'use strict'
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

//upload archive
const booksRoutes = require('./routes/books.routes');
const usersRoutes = require('./routes/users.routes');

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// route
app.use('/api/books', booksRoutes);
app.use('/api/user', usersRoutes);
// export
module.exports = app;
