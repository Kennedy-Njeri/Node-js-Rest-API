const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid!")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')
            }
        },
        trim: true,
        minlength: 7

    }})

userSchema.statics.findBycredentials = async (email, password) => {

    const user = await User.findOne({ email: email})

    if (!user) {
        throw new Error("Unable to login")

    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login")
    }

    return user
}


// we are going to run save() middleware before a user is saved e.g check if there is a plain text password and hash it
// when the object is passed in the model it is automatically converted into a schema behind the scenes

// now we can take advantage of the middleware

// in middleware we can use pre/before saving or post/after saving

// this its the user being saved
// we call next when we are done running our code

// Hash the plain text before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    //console.log("Just before saving!!")

    next()
})

const User = mongoose.model('User', userSchema)




module.exports = User