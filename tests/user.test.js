const request = require('supertest')

const app = require('../src/app')


test('Should sign up user', async () => {
    await request(app).post('/users').send({
        name: 'Vincent',
        email: 'vincent@gmail.com',
        password: 'MyPass2020!'
    }).expect(201)
})