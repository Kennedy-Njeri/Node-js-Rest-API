require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndRemove('5e5cbef4adeb751af1e31599').then((tasks) => {
    console.log(tasks)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch(error => {
    console.log(error)
})


