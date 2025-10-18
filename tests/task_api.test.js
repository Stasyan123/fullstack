const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Task = require('../models/task')

const dbProvider = require('../services/mongoDbProvider')
dbProvider.initDb()

const api = supertest(app)
const helpers = require('./helpers/taskApiHelper')
const status = require('../enums/status')

beforeEach(async () => {
  await Task.deleteMany({})
  await Task.create(helpers.initialTasks)
})

test('tasks are all returned', async () => {
    await api
        .get('/api/tasks')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => {
          expect(response.body).toHaveLength(helpers.initialTasks.length)
        })
})

describe('Test single item select', () => {
  test('with id which not exists', async () => {
    const notExistingId = await helpers.notExistingId()  

    await api
      .get(`/api/tasks/${notExistingId}`)
      .expect(404)
  })

  test('with id which exists', async () => {
    const items = await helpers.getItems()
    const firstItem = items[0]

    const testTask = await api.get('/api/tasks/' + firstItem.id)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(testTask.body).toStrictEqual(firstItem)
  })
})

describe('Test delete', () => {
  test('task with existed id', async () => {
    const items = await helpers.getItems()
    const firstItem = items[0]

    await api.delete('/api/tasks/' + firstItem.id)
      .expect(204)
  })

  test('task with not existed id', async () => {
    const notExistingId = await helpers.notExistingId()  

    await api.delete(`/api/tasks/${notExistingId}`)
      .expect(404)
  })  
})

const statusWrongTest = async () => {
  const newTitle = {
    status: "U"
  }

  const items = await helpers.getItems()
  const firstItem = items[0]

  const errorMessage = await api.put("/api/tasks/" + firstItem.id)
  .send(newTitle)
  .expect(400)

  expect(errorMessage.body).toHaveProperty('error');
  expect(errorMessage.body).toHaveProperty('message');
}

const titleTooShortTest = async () => {
  const newTitle = {
    title: "U"
  }

  const items = await helpers.getItems()
  const firstItem = items[0]

  const errorMessage = await api.put("/api/tasks/" + firstItem.id)
  .send(newTitle)
  .expect(400)

  expect(errorMessage.body).toHaveProperty('error');
  expect(errorMessage.body).toHaveProperty('message', 'Validation failed: title: Min length is 2');
}

describe('Test adding item', () => {
  test('success', async () => {
    const newItem = {
      title: "New title",
      description: "New description",
      status: status[0]
    }

    const itemCreated = await api.post("/api/tasks")
      .send(newItem)
      .expect('Content-Type', /json/)
      .expect(201)

    const allItems = await helpers.getItems()

    expect(allItems).toHaveLength(helpers.initialTasks.length + 1)
    expect(itemCreated.body).toMatchObject(newItem)
  })

  test('title too short', titleTooShortTest)
  test('status wrong', statusWrongTest)
})

describe('Test update item', () => {
  test('title success', async () => {
    const newTitle = {
      title: "Updated title"
    }

    const items = await helpers.getItems()
    const firstItem = items[0]  

    const taskUpdated = await api.put(`/api/tasks/${firstItem.id}`)
    .send(newTitle)
    .expect(200)

    const itemsUpdate = await helpers.getItems()
    const newItem = itemsUpdate.find(task => task.id === firstItem.id)

    expect(newItem.title).toBe(newTitle.title)
  })  

  test('which not exists', async () => {
    const newTitle = {
      title: "Updated title"
    }

    const notExistingId = await helpers.notExistingId()

    await api.put(`/api/tasks/${notExistingId}`)
    .expect(404)
  })

  test('title too short', titleTooShortTest)
  test('status wrong', statusWrongTest)
})

afterAll(async () => {
  await mongoose.connection.close()
})