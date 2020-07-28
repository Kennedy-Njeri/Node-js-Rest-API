const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')



// user one
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


// user two
const userTwoId = new mongoose.Types.ObjectId()

const userTwo = {
    _id: userTwoId,
    name: 'Kevin',
    email: 'durant@gmail.com',
    password: 'Durant@2020!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: userOne._id
}


const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: userOne._id
}


const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    owner: userTwo._id
}





const setupDatabase = async () => {
    // deletes all users b4 all user test cases are run
    await User.deleteMany()
    await Task.deleteMany()
    // ensure we have data for testing e.g logging in
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}


// object shorthand notation
module.exports = {
    userOne, userOneId, setupDatabase
}