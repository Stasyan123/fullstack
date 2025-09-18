const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

let url = process.env.MONGODB_URI
url = url.replace('<db_password>', process.env.DB_PASSWORD)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => console.log(error.message))

module.exports = mongoose