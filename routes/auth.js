const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration and login routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
