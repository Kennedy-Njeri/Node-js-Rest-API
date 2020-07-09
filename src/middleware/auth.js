const jwt = require('jsonwebtoken')
const User = require('../models/user')



const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        //console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token

        // give the router handler access to the user we fetched from the database // store user fetched
        req.user = user

        // lets route handler run
        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
}




module.exports = auth