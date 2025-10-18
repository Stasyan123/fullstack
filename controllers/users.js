const tasksRouter = require('express').Router()
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

tasksRouter.get('/', async (request, response) => {
    const users = await userModel.find({}).populate('tasks', { title: 1, description: 1, status: 1 })

    return response.json(users)
})

tasksRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if (!username || !password) {
        return response.status(400).send('Username and password are required!')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const savedUser = await userModel.create({ username, password: passwordHash })
    
    response.status(201).json(savedUser)
})

module.exports = tasksRouter