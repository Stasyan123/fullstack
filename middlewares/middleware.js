const logger = require('../utils/logger')

const morgan = require('morgan')
morgan.token('params', function (req) { return JSON.stringify(req.body) })

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' || error.name === 'ValidationError') {
    return response.status(400).send(
      { error: error.name, message: error.message }
    )
  } else if (error.name === 'MongoServerError') {
    return response.status(400).json(
      { error: 'Db Something went wrong!' }
    )
  } else if (error.name === 'UnauthorizedAccessError' || error.name === 'JsonWebTokenError') {
    return response.status(401).json(
      { error: 'Unauthorized access!' }
    )
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json(
      { error: 'Token expired!' }
    )
  }

  response.status(500).json({ error: 'Something went wrong!' })
}

const unknownEndpoint  = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

module.exports = {
  morgan,
  errorHandler,
  unknownEndpoint
}