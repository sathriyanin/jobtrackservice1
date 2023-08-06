const express = require('express');
const AuthService = require('../services/authService');

const router = express.Router();

router.route('/login').post(AuthService.login);
router.route('/client/login').post(AuthService.clientLogin);
router.route('/register').post(AuthService.registerUser);

module.exports = router;