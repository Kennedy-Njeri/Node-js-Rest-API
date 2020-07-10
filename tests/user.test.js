const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Lebron',
    email: 'lebron@gmail.com',
    password: 'Lebron@2020!'
}


beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('Should sign up user', async () => {
    await request(app).post('/users').send({
        name: 'Vincent',
        email: 'vincent@gmail.com',
        password: 'MyPass2020!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})


test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'theisnotmypass'
    }).expect(400)
})