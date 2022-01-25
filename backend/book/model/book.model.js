'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title : String,
    author : String,
    category : String,
    publisher : String,
    isbn : String,   
    cover: String,
    borrowed:  Boolean,
    borrowedTo: String
});

module.exports =mongoose.model('Book',bookSchema);
