

const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const secret ='not look, hentai';

const controller = {
    create: function (req, res) {       
                  
        var user = new User();
        var params = req.body;
        user.name = params.name;
        user.password = params.password;
        user.email = params.email;
        
        user.password = user.generateHashPassword(user.password);
        
        
        user.save((err, userCreated) => {
            if(err && err.code === 11000) return res.status(500).send({ message: 'email already exists' });
            if (err) return res.status(500).send({ message: 'Error'});
            if(!userCreated) return res.status(404).send({ message: 'User not Created'}); 
                             
            const token = jwt.sign({_id : user._id}, secret);
            return res.status(200).send({  
                token,                     
                result: true
            });
        })                
        
        
        
        
    },
    login: function (req, res) {
        
        User.findOne({email: req.body.email}, (err, user) =>{
            if(user == null) return res.status(404).send({ message: 'User or password not valid' });
            if (user != null && !user.validPassword(req.body.password)) return res.status(404).send({ message :'User or password not valid'});
            if(err) return res.status(500).send({ message :'error'});                            
                            
            const token = jwt.sign({_id : user._id}, secret );
            return res.status(200).send({
                token,                
                message: 'login success'
            })
        });
    },
    isLogged: function (req, res) {
        if(req.session.user == null) return res.status(404).send({ loggedIn: false})
        userLogged = req.session.user;
        res.status(200).send({loggedIn: true, userLogged});
        
    },
    
}
module.exports = controller;