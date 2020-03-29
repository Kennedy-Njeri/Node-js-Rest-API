const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')





// creating a new task for a user
router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        const tasks = await task.save()
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch(error => {
    //     res.status(400).send(error)
    // })
})

// GET /tasks?completed=true
router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        //const tasks = await Task.find({ owner: req.user._id})
        // or use
        await req.user.populate({
            path: 'tasks',
            match: match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch(error => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    //const _id = req.params.id

    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //        return res.status(404).send()
    //     }
    //
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    // convert an object to an array of its properties
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        //const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})


        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            return task[update] = req.body[update]
        })

        // where our middleware is being executed
        await task.save()


        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})


module.exports = router