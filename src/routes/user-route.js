const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const userController = require('../controller/user-controller');

router.post('/signup' ,userController.DataValidation(), userController.user_signup);

router.post('/login' , userController.user_login);

router.get('/users', userController.get_all_users);
module.exports = router;