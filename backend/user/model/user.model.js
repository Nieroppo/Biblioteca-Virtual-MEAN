'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var userSchema = new Schema({
    name : { 
        type: String,
        required: true,
        trim: true
    },
    email : { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password :{ 
        type: String,
        required: true,
        trim: true
    }   
});


userSchema.methods.generateHashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports =mongoose.model('User',userSchema);