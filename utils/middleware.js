const logger = require('./logger')

const morgan = require('morgan')
morgan.token('params', function (req) { return JSON.stringify(req.body) })

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' || error.name === 'ValidationError') {
    return response.status(400).send({ error: error.name, message: error.message })
  }

  response.status(500).send('Something went wrong!')
}

const unknownEndpoint  = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

module.exports = {
  morgan,
  errorHandler,
  unknownEndpoint
}