'use strict'

const Book = require('../model/book.model');
const fs = require('fs');
const path = require('path');


const controller ={
    saveBook :  function(req, res){
       /* if(req.userIsAdmin == null) return res.status(404).send({ loggedIn: false});
        if(!req.userIsAdmin) return res.status(404).send({ isAdmin: false});
        */
        var book = new Book();

        var params = req.body;
        book.title = params.title;
        book.author = params.author;
        book.category = params.category;
        book.publisher = params.publisher;
        book.isbn = params.isbn;       
        book.cover = "";
        book.borrowed = false;
        book.borrowedTo ="";

        book.save((err, bookStored) =>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!bookStored) return res.status(404).send({messege: 'Book not stored'});
            return res.status(200).send({
                book: bookStored,
                message: "Book saved"
            })
        })
        
    },
    getBookById : function(req, res){
        var bookId =req.params.id;
        if(bookId == null) return res.status(404).send({messege: 'Book not found'});
        Book.findById(bookId, (err, book) =>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!book) return res.status(404).send({messege : 'Book not found'});
            return res.status(200).send({
                book
            });
        })

    },
    getBookByName : function(req, res){
        var bookName = req.params.name;
        if(bookName == null) return res.status(404).send({messege: 'Book not found'});
        Book.find({'title': {'$regex': bookName, '$options' : 'i'}}).exec((err, books) =>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!books) return res.status(404).send({messege: 'Books not found'})
            return res.status(200).send({books});
        })

    },
    getBooks : function(req, res){
        Book.find({}).exec((err, books) =>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!books) return res.status(404).send({messege: 'Books not found'})
            return res.status(200).send({books});
        })
    },
    availableBooks : function(req, res){
        Book.find({borrowed : false}).exec((err, books) =>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!books) return res.status(404).send({messege: 'Books not found'})
            return res.status(200).send({books});
        })
    },
    borrowedBooks : function(req, res){
        if(req.userIsAdmin == null) return res.status(404).send({ loggedIn: false});
        if(!req.userIsAdmin) return res.status(404).send({ isAdmin: false});
        Book.find({borrowed : true}).exec((err, books) =>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!books) return res.status(404).send({messege: 'Books not found'})
            return res.status(200).send({books});
        })
    },
    booksByCategory : function(req, res){
        const bookCategory =req.params.category;
        if(bookCategory == null) return res.status(404).send({messege: 'Book not found'});
        Book.find({'category': {'$regex': bookCategory, '$options' : 'i'}}).exec((err, books) =>{            
            if(err) return res.status(500).send({messege: 'Error'});
            if(!books) return res.status(404).send({messege: 'Books not found'})
            return res.status(200).send({books});
        })
    },
    uploadCover : function(req, res){        
        
        var bookId = req.params.id;
        var fileName = 'Image not valid';
        
        if(req.files){
           
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
           /* if(req.userIsAdmin == null || !req.userIsAdmin) {
                fs.unlink(filePath, (err) => {
                    if(err) throw err;
                })
                return res.status(200).send({messege: 'User not valid'});
            
            } */         
            if(fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'jpg'){
                Book.findByIdAndUpdate(bookId, {cover : fileName},{new: true},(err, bookUpdated) => {
                    if(err) return res.status(500).send({messege: 'Error'});
                    if(!bookUpdated) return res.status(404).send({messege: 'Book not found'});
                    return res.status(200).send({
                        book: bookUpdated
                    })
                })
            }else{
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({messege: 'Extension not valid'})
                })
            }
            
        }else{
            return res.status(200).send({messege: 'image not valid'})
        }
    },
    myBooks: function(req, res){
        if(req.userEmail == null) return res.status(404).send({ loggedIn: false});
        const userEmail = req.userEmail;
        Book.find({"borrowed" : true , "borrowedTo": userEmail}).exec((err, books) =>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!books) return res.status(404).send({messege: 'Books not found'})
            return res.status(200).send({
                books
            });
        })
    },
    takeABook: function(req, res){
        if(req.userEmail == null) return res.status(404).send({ loggedIn: false});
        const userEmail = req.userEmail;
        Book.findOneAndUpdate({"_id": req.params.id, "borrowed": false}, {"$set": {"borrowed": true, "borrowedTo": userEmail}},{new : true},(err, bookUpdated)=>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!bookUpdated) return res.status(404).send({messege: 'Book not found'});
            return res.status(200).send({
                book: bookUpdated
            })
        })

    },
    takeBack: function(req, res){
        if(req.userEmail == null) return res.status(404).send({ loggedIn: false});
        const userEmail = req.userEmail;
        Book.findOneAndUpdate({"_id": req.params.id, "borrowed": true,"borrowedTo" : userEmail}, {"$set": {"borrowed": false, "borrowedTo": ""}},{new : true},(err, bookUpdated)=>{
            if(err) return res.status(500).send({messege: 'Error'});
            if(!bookUpdated) return res.status(404).send({messege: 'Book not found'});
            return res.status(200).send({
                book: bookUpdated
            })
        })

    },
    getCover: function(req, res){
        const file = req.params.image;
        
        const path_file = './covers/'+file;

        fs.stat(path_file, (error)=>{
            if(!error){
                return res.sendFile(path.resolve(path_file));              
            }else{
                
                return res.status(200).send({
                    messege : 'cover does not exists'
                })

            }
        })
    },
    isLogin : function(req, res){
        if(req.userId == null) return res.status(404).send({ loggedIn: false})
        const userLogged = ({
            id : req.userId,
            name : req.userName,
            email: req.userEmail,
            isAdmin: req.userIsAdmin
        });
        res.status(200).send({loggedIn: true, userLogged});
    }
}
module.exports = controller;