const mongoose = require('mongoose')
//const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})



// validators- built in https://mongoosejs.com/docs/validation.html
// npm validator



// const me = new User({
//     name: 'vic',
//     email: 'vic@gmail.com',
//     age: 22,
//     password: 'joemwas123'
// })
//
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error", error)
// })


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
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