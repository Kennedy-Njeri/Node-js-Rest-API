// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectId } = require("mongodb")

const connectionURL = 'mongodb://127.0.0.1:27018'
const databaseName = 'task-manager'

// https://docs.mongodb.com/manual/reference/method/ObjectId/
// id in mongo uses binary data instead of string for size reduction
// generate ids for our documents b4 inserting them to our database..generated by node Global unique identifiers
// const id = new ObjectId()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.toString())
//console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }

    //console.log("Connected correctly!")
    const db = client.db(databaseName)
    // http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#~insertOneWriteOpResult


    // Delete

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: "Apply jobs"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })









})



// updateOne https://docs.mongodb.com/manual/reference/operator/update/
// db.collection('users').updateOne({
//     _id: new ObjectId("5e3af0d00da68d6a77195f9f")
// }, {
//     $inc: {
//         age: 1
//     }
//     // $set: {
//     //     name: 'Nas'
//     // }
// }).then(result => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })

// db.collection('tasks').updateMany({
//     completed: false
// }, {
//     $set: {
//         completed: true
//     }
// }).then(result => {
//     console.log(result.modifiedCount)
// }).catch(error => {
//     console.log(error)
// })

// findOne
//  db.collection('users').findOne({ name: "jane" }, (error, result) => {
//      if (error) {
//          return console.log("Unable to get user")
//      }
//
//      console.log(result)
//  })

// find returns a cursor to the pointer of the document in the database(cursor -> pointer to data)

// db.collection("tasks").findOne({ _id: new ObjectId('5e3af534a2f4046a826e556e')}, (error, result) => {
//     if (error) {
//         return console.log("Unable to find document")
//     }
//
//     console.log(result)
//
// })

// db.collection('tasks').find({ completed: false }).toArray((error, result) => {
//     if (error) {
//         return console.log("Unable to find results")
//     }
//
//     console.log(result)
// })

// db.collection('users').find({ age:25 }).toArray((error, result) => {
//     if (error) {
//         return console.log("Unable to find Age")
//     }
//
//     console.log(result)
// })
//
// db.collection('users').find({ age:25 }).count((error, result) => {
//     if (error) {
//         return console.log("Unable to find Age")
//     }
//
//     console.log(result)
// })







// Insert
// db.collection('users').insertOne({
//     _id: id,
//     name: "vic",
//     age: 28
// }, (error, result) => {
//     if(error) {
//         return console.log("Unable to insert User")
//     }
//     console.log(result.ops)
// })

// Insert Many
// db.collection('users').insertMany([
//     {
//         name: "jane",
//         age: 22
//     },
//     {
//         name: "Victor",
//         age: 25
//     }
// ], (error, result) => {
//     if (error) {
//         return console.log("Unable to insert Users")
//     }
//
//     console.log(result.ops)
// })

// db.collection('tasks').insertMany([
//     {
//         description: "renew licence",
//         completed: true
//     },
//     {
//         description: "Apply jobs",
//         completed: false
//     }
// ], (error, result) => {
//     if(error) {
//         return console.log("Unable to insert tasks")
//     }
//     console.log(result.ops)
// })
