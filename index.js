const { PORT } = require('./utils/config')
const logger = require('./utils/logger')
const dbProvider = require('./services/mongoDbProvider')

dbProvider.initDb()

const app = require('./app')

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})