const towingtruckController = require('../controllers/towingtruckController');

// router
const router = require('express').Router()

// use routers customer

// router.post('/addTowingtruck', towingtruckController.upload , towingtruckController.addTowingtruck);
router.post('/addTowingtruck', towingtruckController.addTowingtruck);
router.post('/login', towingtruckController.login);
router.get('/allTowingtruck', towingtruckController.getAllTowingtruck);
router.get('/getOneTowingtruck/:id', towingtruckController.getOneTowingtruck);
router.put('/updateTowingtruck/:id', towingtruckController.updateTowingtruck);
router.delete('/deleteTowingtruck/:id', towingtruckController.deleteTowingtruck);

module.exports = router