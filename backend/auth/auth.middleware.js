const User = require('../user/model/user.model');
const jwt = require('jsonwebtoken');
const secret ='not look, hentai';

const middleware ={
    verifyToken : function(req, res, next) {
    
        if(!req.headers.authorization){
            return res.status(404).send('an unauthorized request');        
        }
    
        const token = req.headers.authorization.split(' ')[1];
        if(token === null){
            return res.status(404).send('an unauthorized request'); 
         }
         const payload = jwt.verify(token, secret);
         req.userId = payload._id;
         next();
    },    
   
    name: function (req, res, next){        
        
        User.findOne({_id: req.userId}, (err, user) => {
            if(user == null) return res.status(404).send({ message: 'User not valid' });
            
            if(err) return res.status(500).send({ message :'error'});
    
            req.userName = user.name;
            next();
        })
    },
    email: function (req, res, next){        
        console.log(req.userId);
        User.findOne({_id: req.userId}, (err, user) => {
            if(user == null) return res.status(404).send({ message: 'User not valid' });
            
            if(err) return res.status(500).send({ message :'error'});
    
            req.userEmail = user.email;
            next();
        })
    }
}
module.exports = middleware;