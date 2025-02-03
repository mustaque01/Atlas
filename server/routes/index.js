// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/AuthController');
const Login = require('../controllers/Login')
const authToken = require('../middleware/AuthToken')
const userDetailsController = require('../controllers/UserDetail')

const router = express.Router();

// Define the signup route
router.post('/signup', authController.signup);
router.post('/login',Login)
router.get("/user-details",authToken,userDetailsController)


module.exports = router;
