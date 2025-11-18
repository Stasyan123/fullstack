const tasksRouter = require('express').Router()
const Task = require('../models/task')

const responseService = require('../services/ResponseService')
const verifyLogin = require('../middlewares/verifyLogin')

tasksRouter.use(verifyLogin)

tasksRouter.get('/', async (request, response) => {
  let tasks = []

  if (request.auth.user.role !== roles.ADMIN) {
    tasks = await Task.find({})
  } else if (request.auth.user.role === roles.USER) {
    tasks = await Task.find({ user: request.auth.user.id })
  }

  response.json(tasks.toJSON())
})

tasksRouter.get('/:id', async (request, response) => {
  const task = await Task.findById(request.params.id)
  
  if (!isUserHasAccessToTask(request.auth.user, task)) {
    return responseService.accessDenied(response)
  }

  if (!task) {
    return response.status(404).end()
  }

  response.json(task)
})

tasksRouter.delete('/:id',async (request, response) => {
  const task = await Task.findByIdAndDelete(request.params.id)

  if (!isUserHasAccessToTask(request.auth.user, task)) {
    return responseService.accessDenied(response)
  }

  if (task) {
    return response.status(204).end()
  }

  response.status(404).end()
})

tasksRouter.put('/:id', async (request, response) => {
  const task = await Task.findByIdAndDelete(request.params.id)

  if (!task) {
    return response.status(404).end()
  }

  if (!isUserHasAccessToTask(request.auth.user, task)) {
    return responseService.accessDenied(response)
  }

  const update = {}

  for (const field in request.body ) {
    if (field === 'id') continue

    update[field] = request.body[field]
  }

  const result = await task.set(update).save()

  response.json(result)
})

tasksRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await userModel.findOne({id: request.auth.user.id})

  if (!user) {
      return next(new UnauthorizedAccessError('User is not exists!'))
  }

  const newTask = new Task({
    title: body.title,
    description: body.description,
    status: body.status || 'toDo',
    user: user._id
  })

  const task = await newTask.save()
  response.status(201).json(task)
})

const isUserHasAccessToTask = (user, task) => { 
  return user.role === roles.ADMIN || task.user.toString() === user.id
}

module.exports = tasksRouter