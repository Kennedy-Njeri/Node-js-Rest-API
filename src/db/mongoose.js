const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})



// validators- built in https://mongoosejs.com/docs/validation.html
// npm validator

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number")
            }
        }
    }
})


const me = new User({
    name: 'Vicky',
    age: -1
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error", error)
})


const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const task = new Task({
//     description: 'Learn Node js',
//     completed: false
// })
//
// task.save().then(() => {
//     console.log(task)
// }).catch(error => {
//     console.log(error)
// })