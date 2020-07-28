const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase} = require('./fixtures/db')




beforeEach(setupDatabase)


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


test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)

    // in this case when comparing objects we user toEqual
    // objects are not equal {} === {} toBe users a ===
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Kevin durant'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Kevin durant')
})


test('Should not invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Nairobi'
        })
        .expect(400)

})