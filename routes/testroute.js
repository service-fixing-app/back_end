const uploadController = require('../controllers/testUploadController')

// router
const router = require('express').Router()

// use routers customer

router.post('/addImage', uploadController.addImage);

module.exports = router