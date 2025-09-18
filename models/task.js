const mongoose = require('../services/mongoDbProvider.js')

const taskScheme = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
}) 

taskScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v   
    }
})

module.exports = mongoose.model('Task', taskScheme)

