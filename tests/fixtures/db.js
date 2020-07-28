const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')


const userOneId = new mongoose.Types.ObjectId()


const userOne = {
    _id: userOneId,
    name: 'Lebron',
    email: 'lebron@gmail.com',
    password: 'Lebron@2020!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


const setupDatabase = async () => {
    // deletes all users b4 all user test cases are run
    await User.deleteMany()
    // ensure we have data for testing e.g logging in
    await new User(userOne).save()
}


// object shorthand notation
module.exports = {
    userOne, userOneId, setupDatabase
}