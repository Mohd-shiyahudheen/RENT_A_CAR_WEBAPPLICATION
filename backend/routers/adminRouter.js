const express = require('express');
const { AdminLogin, Addcars, upload, viewUsers, findAllCars, deleteCar, editCar, postEditedCars, blockUser, userBlog, displayBlog } = require('../controllers/adminControllers');
const router = express.Router()




router.post('/adminLogin',AdminLogin)
router.post('/addCar',upload.single("image"), Addcars)
router.get('/findcars',findAllCars)
router.get('/findUser',viewUsers)
router.delete('/deleteCar/:id',deleteCar)
router.get('/editCar/:id',editCar)
router.put('/postEditCar/:id',postEditedCars)
router.post('/blockUser/:id',blockUser)
router.post('/postBlog',upload.single("picture"),userBlog)
router.get('/blogData',displayBlog)



module.exports = router;