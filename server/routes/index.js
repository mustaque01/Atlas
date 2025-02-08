// routes/authRoutes.js
const express = require('express');
const { signup, generateOTP, verifyOTP }  = require('../controllers/AuthController');
const Login = require('../controllers/Login')
const authToken = require('../middleware/AuthToken')
const userDetailsController = require('../controllers/UserDetail')

const router = express.Router();

// Define the signup route
router.post('/signup', signup);
router.post('/login',Login)
router.get("/user-details",authToken,userDetailsController)
router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;
