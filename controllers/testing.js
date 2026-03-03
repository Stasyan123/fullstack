const router = require('express').Router()

const userModel = require('../models/user')
const taskModel = require('../models/task')

router.get('/reset', async (request, response) => {
  await userModel.deleteMany({})
  await taskModel.deleteMany({})

  response.status(204).end()
})

module.exports = router