const tasksRouter = require('express').Router()
const Task = require('../models/task')

tasksRouter.get('/', async (request, response) => {
  const tasks = await Task.find({})
  
  response.json(tasks)
})

tasksRouter.get('/:id', async (request, response) => {
  const task = await Task.findById(request.params.id)
    
  if (!task) {
    return response.status(404).end()
  }

  response.json(task)
})

tasksRouter.delete('/:id',async (request, response) => {
  const task = await Task.findByIdAndDelete(request.params.id)

  if (task) {
    return response.status(204).end()
  }

  response.status(404).end()
})

tasksRouter.put('/:id', async (request, response) => {
  const update = {}

  for (const field in request.body ) {
    if (field === 'id') continue

    update[field] = request.body[field]
  }

  const result = await Task.findByIdAndUpdate(request.params.id, update, { runValidators: true })

  if (!result) {
    return response.status(404).end()
  }

  response.json(result)
})

tasksRouter.post('/', async (request, response) => {
  const body = request.body

  const newTask = new Task({
    title: body.title,
    description: body.description,
    status: body.status || 'toDo'
  })

  const task = await newTask.save()
  response.status(201).json(task)
})

module.exports = tasksRouter