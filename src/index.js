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

// hashing algorithms you cant reverse the process - one way,  with encryption algorithms one can get the original value

const bycrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Kevin254'
    // rounds determines how many times the hashing algorithms is executed
    const hashedPassword = await bycrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bycrypt.compare(password, hashedPassword)
    console.log(isMatch)
}

myFunction()