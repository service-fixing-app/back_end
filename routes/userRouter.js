// import controllers user
const userController = require('../controllers/userController')


// router
const router = require('express').Router()


// use routers user 
router.post('/sigup', userController.upload , userController.signup)

router.get('/allUsers', userController.getAllUsers)



module.exports = router