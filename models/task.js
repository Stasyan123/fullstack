const mongoose = require('mongoose')
const statuses = require('../enums/status.js')

const taskScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value.length > 2
      },
      message: () => 'Min length is 2'
    }
  },
  description: String,
  status: {
    type: String,
    enum: statuses,
    required: true
  }
})

taskScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskScheme)

