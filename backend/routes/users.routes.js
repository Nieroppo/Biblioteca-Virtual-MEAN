'use strict'

const express = require('express');

const UserController = require('../user/controller/user.controller');
const AuthController = require('../auth/auth.middleware');

const router = express.Router();

router.post('/create', UserController.create);
router.post('/login', UserController.login);
router.get('/islogged', UserController.isLogged);
module.exports = router;