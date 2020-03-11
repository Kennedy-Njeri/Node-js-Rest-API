const jwt = require('jsonwebtoken')
const User = require('../models/user')



const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisnodejs')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        // give the router handler access to the user we fetched from the database
        req.user = user

        // lets route handler run
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
}




module.exports = auth