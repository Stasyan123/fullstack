require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Task = require("./models/task.js")

const app = express()

//var corsOptions = {
//  origin: 'http://localhost:5173'
//}
//app.use(cors(corsOptions))

app.use(express.static('dist'))
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :params'))
morgan.token('params', function (req, res) { return JSON.stringify(req.body) })

//const uuid = require('./services/generateUniqueId.js')

app.get('/api/tasks', (request, response) => {
    Task.find({})
        .then(tasks => response.json(tasks))
})

app.get('/api/tasks/:id', (request, response, next) => {
    Task.findById(request.params.id)
        .then(task => {
            if (!task) {
                return response.status(404).end()
            } 

            response.json(task)
        }) 
        .catch(err => next(err))    
})

app.delete('/api/tasks/:id', (request, response, next) => {
    Task.findByIdAndDelete(request.params.id)
    .then(task => {
        if (task) {
            return response.status(204).end()
        } 
        
        response.status(404).end()
    }) 
    .catch(err => next(err))
})

app.put('/api/tasks/:id', (request, response, next) => {
    const update = {}

    for (field in request.body ) {
        if (field == 'id') continue   
 
        update[field] = request.body[field]
    }

    Task.findByIdAndUpdate(request.params.id, update)
        .then(result => {
            if (!result) {
                return response.status(404).end()
            }
           
            response.json(result)
        })
        .catch(err => next(err))
})

app.post('/api/tasks', (request, response) => {
    const body = request.body
    
    if (!body.title) {
        response.statusMessage = 'Title is required!'
        response.status(400).end()
    }

    const newTask = new Task({
        title: body.title,
        description: body.description,
        status: body.status || 'toDo'
    })

    newTask.save()
        .then(task => response.json(task))
        .catch(err => {
            response.statusMessage = err.message
            response.status(400).end()
        })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const end = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}

app.use(end)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})