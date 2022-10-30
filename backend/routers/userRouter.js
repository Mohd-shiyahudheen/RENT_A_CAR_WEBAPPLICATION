const express = require('express');
const { registerUser, loginUser,
    checkVerification, GoogleSignin,
    displayCars, BookingCar, bookingData,
    generateRazorpay, verifyPayment, bookingCancelled } = require('../controllers/userControllers');
const router = express.Router()
 

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/otp', checkVerification)
router.post('/google ', GoogleSignin)
router.get('/displayCars', displayCars)
router.get('/booking/:id', BookingCar)
router.post('/bookingData', bookingData)
router.post('/razorpay', generateRazorpay)
router.post('/verifyPayment', verifyPayment)
router.put('/cancelled/:id',bookingCancelled)

module.exports = router;