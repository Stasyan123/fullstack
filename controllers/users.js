const userRouter = require('express').Router()
const userModel = require('../models/user')

const verifyLogin = require('../middlewares/verifyLogin')

const hashService = require('../services/hashService')
const roles = require('../enums/roles')

userRouter.get('/', verifyLogin, async (request, response) => {
    if (request.auth.user.role !== roles.ADMIN) {
        const users = await userModel.find({}).populate('tasks', { title: 1, description: 1, status: 1 })
        return response.json(users)
    }

    const user = await userModel.findById(request.auth.user.id).populate('tasks', { title: 1, description: 1, status: 1 })
    return response.json(user)
})

userRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if (!username || !password) {
        return response.status(400).send('Username and password are required!')
    }

    const user = await userModel.findOne({username: username})

    if (user) {
        return response.status(401).send('Username or password is invalid!')
    }

    const passwordHash = await hashService.hash(password)
    const savedUser = await userModel.create({ username, password: passwordHash })
    
    response.status(201).json(savedUser)
})

module.exports = userRouter