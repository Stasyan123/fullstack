const mongoose = require('mongoose')
const { MONGODB_URI, DB_PASSWORD } = require('../utils/config.js')

const logger = require('../utils/logger.js')

const initDb = () => {
  mongoose.set('strictQuery', false)

  const url = MONGODB_URI.replace('<db_password>', DB_PASSWORD)

  mongoose.connect(url)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch(error => logger.error(error.message))
}

module.exports = { initDb }