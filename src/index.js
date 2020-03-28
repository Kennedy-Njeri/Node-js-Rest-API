const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// for site maintenance
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon')
// })




// app.use((req, res, next) => {
//     if(req.method == 'GET') {
//         res.send("GET requests are disabled")
//     } else {
//         next()
//     }
//     // console.log(req.method, req.path)
//     // next()
// })


// https://httpstatuses.com/
// parse our incoming json data for use into an object
app.use(express.json())


app.use(userRouter, taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// hashing algorithms you cant reverse the process - one way,  with encryption algorithms one can get the original value

// const bycrypt = require('bcryptjs')
//
// const myFunction = async () => {
//     const password = 'Kevin254'
//     // rounds determines how many times the hashing algorithms is executed
//     const hashedPassword = await bycrypt.hash(password, 8)
//
//     console.log(password)
//     console.log(hashedPassword)
//
//     const isMatch = await bycrypt.compare(password, hashedPassword)
//     console.log(isMatch)
// }
//
// myFunction()

// const jwt = require('jsonwebtoken')
//
// const myFunction = async () => {
//     const token = await jwt.sign({_id: '1234asde'}, 'thisismytoken', { expiresIn: '7 days'}) //secrete to sign the token that has not been tampered with
//     console.log(token)
//
//     // type of token and algorithm used      paylod/body-contains data we provided i.e id    verify the token
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0YXNkZSIsImlhdCI6MTU4Mzg0ODAyNn0.iteByHEM1YcIXRMeLlHr2568N8Pqla95G5ZDwdQgYHY
//
//     const data = await jwt.verify(token, 'thisismytoken')
//     console.log(data)
//
//
// }
//
// myFunction()

// const pet = {
//     name: "joe"
// }
//
// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
//
//
// console.log(JSON.stringify(pet))

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e7f73ab41f1d22493434a07')
    // // find user associated with the task
    // await task.populate('owner').execPopulate()
    // //return task
    // console.log(task.owner)
    const user = await User.findById('5e7f725aaa951f2480a58015')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

}


main();