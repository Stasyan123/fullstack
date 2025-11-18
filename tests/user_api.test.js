const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const db = require('../services/mongoDbProvider')

db.initDb()

const User = require('../models/user')
const api = supertest(app)

const { initialUsers } = require('./helpers/userApiHelper')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)    
})

describe('User creation', () => {
    test('success', async () => {
        const newUser = {
            username: 'newUniqueUser',
            password: 'uniquePassword'
        }

        const createdUser = await api.post('/api/users/')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(201)

        expect(newUser.username).toEqual(createdUser.body.username)
    })

    test('username not unique', async () => {
        const newUser = {
            username: 'testuser1',
            password: 'uniquePassword'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(400)
    })
})