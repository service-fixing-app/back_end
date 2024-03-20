const repairshopController = require('../controllers/repairshopController');

// router
const router = require('express').Router()

// use routers customer

//router.post('/addRepairshop', repairshopController.upload , repairshopController.addRepairshop);
router.post('/addRepairshop', repairshopController.addRepairshop);
router.post('/login', repairshopController.login);
router.get('/allRepairshop', repairshopController.getAllRepairshop);
router.get('/getOneRepairshop/:id', repairshopController.getOneRepairshop);
router.put('/updateRepairshop/:id', repairshopController.updateRepairshop);
router.delete('/deleteRepairshop/:id', repairshopController.deleteRepairshop);

module.exports = router