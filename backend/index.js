'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port =3700;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/library2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
        .then( () =>{
            console.log('Funciona');
            app.listen(port, () =>{
                console.log('Funciona url: localhost:3700');
            });


        })
        .catch( (err) => console.log(err));