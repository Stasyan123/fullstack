const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

var corsOptions = {
  origin: 'http://localhost:5173'
}

app.use(express.json())
app.use(cors(corsOptions))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :params'))
morgan.token('params', function (req, res) { return JSON.stringify(req.body) })

const uuid = require('./services/generateUniqueId.js')

let tasks = [
    {
        "id": "a1f3",
        "title": "HTML is easy",
        "description": "HTML is easy",
        "status": "toDo"
    },
    {
        "id": "b7d9",
        "title": "Learn CSS",
        "description": "Learn CSS basics like selectors, box model, and positioning",
        "status": "toDo"
    },
    {
        "id": "c4e2",
        "title": "Practice JavaScript",
        "description": "Practice working with variables, functions, and DOM manipulation",
        "status": "inProgress"
    },
    {
        "id": "d8k1",
        "title": "Build a project",
        "description": "Build a small to-do app using HTML, CSS, and JS",
        "status": "longTerm"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/tasks', (request, response) => {
    response.json(tasks)
})

app.get('/uuid', (request, response) => {
    response.json(uuid())
})

app.get('/api/tasks/:id', (request, response) => {
    const task = tasks.find(task => task.id === request.params.id)

    if (task) {
        response.json(task)
    }

    response.statusMessage = 'Task not found'
    response.status(404).end()
})

app.delete('/api/tasks/:id', (request, response) => {
    const task = tasks.find(task => task.id === request.params.id)

    if (!task) {
        response.statusMessage = 'Task not found'
        response.status(404).end()
    }

    tasks = tasks.filter(task => task.id !== request.params.id)
    response.status(204).end()
})

app.put('/api/tasks', (request, response) => {
    const body = request.body
    const task = tasks.find(task => task.id === body.id)

    if (!task) {
        response.statusMessage = 'Task not found'
        response.status(404).end()
    }

     if (!body.title) {
        response.statusMessage = 'Title is required!'
        response.status(400).end()
    }

    const newTask = {
        id: body.id,
        title: body.title,
        description: body.description,
        status: body.status
    }

    tasks = tasks.map(item => item.id === newTask.id ? newTask : item)
  
    response.json(newTask)
})

app.post('/api/tasks', (request, response) => {
    const body = request.body
    
    if (!body.title) {
        response.statusMessage = 'Title is required!'
        response.status(400).end()
    }

    const newTask = {
        id: uuid(),
        title: body.title,
        description: body.description,
        status: body.status || 'toDo'
    }

    tasks.push(newTask)
    response.json(newTask)
})

const end = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}

app.use(end)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})