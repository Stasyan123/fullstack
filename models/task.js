const statuses = require('../enums/status.js')
const mongoose = require('../services/mongoDbProvider.js')

const taskScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true  
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

