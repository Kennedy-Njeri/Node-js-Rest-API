const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')




// router.get('/test', (req, res) => {
//     res.send("This is a test")
// })


router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch(error => {
    //     res.status(400).send(error)
    // })
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findBycredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // we are supposed to hide hashed password and tokens
        //res.send({user: user.getPublicProfile(), token}) but instead we use toJSON
        // when we send an object to res.send it is stringified behind the scenes
        res.send({user, token})

    } catch (e) {
        res.status(400).send()
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        // if they are not equal we return true keeping it in the tokens array
        // and if they are equal we return false filtering it out removing it in the tokens array
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/users/me', auth, async (req, res) => {

    // we only get info of the user that is logged in
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send(e)
    // }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch(error => {
    //     res.status(500).send()
    // })
})

// we dont need it as we have the user profile
// router.get('/users/:id', async (req, res) => {
//
//     const _id = req.params.id
//
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
//
//     // User.findById(_id).then(user => {
//     //     if (!user) {
//     //        return res.status(404).send()
//     //     }
//     //
//     //     res.send(user)
//     // }).catch(error => {
//     //     res.status(404).send()
//     // })
//
//     console.log(req.params)
//
// })



router.patch('/users/me', auth, async (req, res) => {
    // convert an object to an array of its properties string
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => {
           return req.user[update] = req.body[update]
        })

        // where our middleware "save" is being executed
        await req.user.save()


        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        //
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

})

const upload = multer({
    //dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // !file.originalname.endsWith('.pdf')
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an Image'))
        }

        cb(undefined, true)

        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})

// sharp used to modify the image we upload
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // buffer -  the modified image by sharp
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    req.user.save()
    res.send()
})


// go to http://localhost:3000/users/5e807969fb37382a5e97f031/avatar in browser to access the image
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router