const customerController = require('../controllers/customerController')

// router
const router = require('express').Router()

// use routers customer

// router.post('/addCustomer', customerController.upload , customerController.addCustomer);
router.post('/addCustomer', customerController.addCustomer);
router.post('/login', customerController.login);
router.post('/logout', customerController.logout);
router.get('/allCustomers', customerController.getAllCustomers);
router.get('/getOneCustomer/:id', customerController.getOneCustomer);
router.put('/updateCustomer/:id', customerController.updateCustomer);
router.delete('/deleteCustomer/:id', customerController.deleteCustomer);
router.get('/getOneImage/:imageName', customerController.getOneImage);

module.exports = router