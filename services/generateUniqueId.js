const uuidGenerator = require('uuid');

const uuid = () => {
    return uuidGenerator.v4()
}

module.exports = uuid;