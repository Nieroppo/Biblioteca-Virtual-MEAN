'use strict'

const express = require('express');
const BooksController = require('../book/controller/book.controller');
const router = express.Router();

const AuthMiddleware = require('../auth/auth.middleware');
const multipart = require('connect-multiparty');

const multipartmiddleware = multipart({uploadDir: './covers'});




router.post('/save', AuthMiddleware.verifyToken,BooksController.saveBook);
router.get('/byid/:id?', BooksController.getBookById);
router.get('/byname/:name?', BooksController.getBookByName);
router.get('/all', BooksController.getBooks);
router.get('/available', BooksController.availableBooks);
router.get('/borrowed',AuthMiddleware.verifyToken, BooksController.borrowedBooks);
router.get('/category/:category?', BooksController.booksByCategory);
router.post('/uploadCover/:id', multipartmiddleware, BooksController.uploadCover);
router.get('/myBooks', AuthMiddleware.verifyToken, AuthMiddleware.email,BooksController.myBooks);
router.get('/takeABook/:id',AuthMiddleware.verifyToken, AuthMiddleware.email, BooksController.takeABook);
router.get('/takeBack/:id', AuthMiddleware.verifyToken, AuthMiddleware.email, BooksController.takeBack);
router.get('/isLogin',AuthMiddleware.verifyToken,AuthMiddleware.name, BooksController.isLogin);
router.get ('/get-cover/:image', BooksController.getCover);
module.exports = router;