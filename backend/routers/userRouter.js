const express = require ('express');
const { registerUser, loginUser, checkVerification, GoogleSignin, displayCars, BookingCar, bookingData } = require('../controllers/userControllers');
const  router= express.Router()


router.post('/signup',registerUser)
router.post('/login',loginUser)
router.post('/otp',checkVerification)
router.post('/google ',GoogleSignin)
router.get('/displayCars',displayCars)
router.get('/booking/:id',BookingCar)
router.post('/bookingData',bookingData)

module.exports =router;