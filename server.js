const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// testing api
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome from api'});
});

// routers
const userrouter = require('./routes/userRouter.js')
app.use('/api', userrouter)

// customer
const customerrouter = require('./routes/customerRouter.js')
app.use('/api/customer', customerrouter)

// repairshop
const repairshoprouter = require('./routes/repairshopRouter.js')
app.use('/api/repairshop', repairshoprouter)

// towingtruck
const towingtruckrouter = require('./routes/towingtruckRouter.js')
app.use('/api/towingtruck', towingtruckrouter)

// testupload routing
const testupload = require('./routes/testroute.js')
app.use('/api', testupload)

//static Images Folder

app.use('/api/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 5000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})