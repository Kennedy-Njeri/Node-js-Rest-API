require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndRemove('5e5cbef4adeb751af1e31599').then((tasks) => {
//     console.log(tasks)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed: false})
    return count
}


deleteTaskAndCount('5e5d3fd44994641f331a32a2').then((result) => {
    console.log(result)
}).catch(error => {
    console.log(error)
})