const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')



const userOneId = new mongoose.Types.ObjectId()


const userOne = {
    _id: userOneId,
    name: 'Lebron',
    email: 'lebron@gmail.com',
    password: 'Lebron@2020!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


beforeEach(async () => {
    // deletes all users b4 all user test cases are run
    await User.deleteMany()
    // ensure we have data for testing e.g logging in
    await new User(userOne).save()
})


test('Should sign up user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Vincent',
        email: 'vincent@gmail.com',
        password: 'MyPass2020!'
    }).expect(201)

    //grab the user saved in the database // confirm user is saved in the db
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()


    // assert the data response
    expect(response.body).toMatchObject({
        user: {
            name: 'Vincent',
            email: 'vincent@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass2020!')
})


test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const  user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})


test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'theisnotmypass'
    }).expect(400)
})


test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthenticated', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})


test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // test user to beNull
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})


test('should not delete account for unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})