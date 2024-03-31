const loginController = require('../controllers/loginController')

// router
const router = require('express').Router()

// use routers 
router.get('/getAllUsers', loginController.getAllUsers);
router.get('/getUserById/:id', loginController.getUserById);
router.post('/loginUser', loginController.loginUser);


module.exports = router