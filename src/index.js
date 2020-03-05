const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// https://httpstatuses.com/
// parse our incoming json data for use into an object
app.use(express.json())


app.use(userRouter, taskRouter)





app.listen(port, () => {
    console.log('Server is up on port ' + port)
})