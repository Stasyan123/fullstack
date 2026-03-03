const router = require('express').Router()
const userModel = require('../models/user')

const hashService = require('../services/hashService')
const jwt = require('jsonwebtoken');

router.post('/', async (request, response) => {
    const { username, password } = request.body

    if (!username || !password) {
        return response.status(400).send('Username and password are required!')
    }

    const user = await userModel.findOne({username: username})

    if (!user) {
        return response.status(401).send('Username or password is invalid!')
    }

    if (!hashService.compare(password, user.password)) {
        return response.status(401).send('Username or password is invalid!')
    }

    const payload = { username: user.username, id: user._id.toString(), role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    response.status(201).json({ token, username: user.username, role: user.role })
})

module.exports = router 