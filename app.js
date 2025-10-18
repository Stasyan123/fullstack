const express = require('express')

const tasksRouter = require('./controllers/tasks')
const usersRouter = require('./controllers/users')

const middlewares = require('./utils/middleware')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(middlewares.morgan(':method :url :status :res[content-length] - :response-time ms :params'))

app.use('/api/tasks', tasksRouter)
app.use('/api/users', usersRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app