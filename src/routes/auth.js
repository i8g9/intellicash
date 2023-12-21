const express = require('express');
const router = express.Router();
const { login, logout, register} = require('../controllers/Auth');
const checkAuth = require('../middleware/auth');
const { sequelize, User } = require('../../src/config/database');


router.post('/login',login);
router.post('/register',register);
router.delete('/logout',checkAuth,logout);


module.exports = router;