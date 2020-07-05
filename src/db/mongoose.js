const mongoose = require('mongoose')
//const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})


// useFindAndModify: false avoid the warning from showing up until mongo addresses the issue

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