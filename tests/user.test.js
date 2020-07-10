const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')


beforeEach(async () => {
    await User.deleteMany()
})


test('Should sign up user', async () => {
    await request(app).post('/users').send({
        name: 'Vincent',
        email: 'vincent@gmail.com',
        password: 'MyPass2020!'
    }).expect(201)
})