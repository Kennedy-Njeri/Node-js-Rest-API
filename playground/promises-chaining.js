require('../src/db/mongoose')
const User = require('../src/models/user')


// 5e5cc704adfa861b69f0d79f https://mongoosejs.com/docs/queries.html https://mongoosejs.com/docs/api/model.html

// User.findByIdAndUpdate('5e5cfe3809dc271db4210ced', { age: 1 }).then((user) => {
//     console.log(user)
//
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age})
    const count = await User.countDocuments({age: 2})
    return count
}

updateAgeAndCount('5e5cc704adfa861b69f0d79f', 2).then((result) => {
    console.log(result)
}).catch(error => {
    console.log(error)
})