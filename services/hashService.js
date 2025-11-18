const bcrypt = require('bcrypt')

const hash = async (text) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(text, saltRounds)
    
    return passwordHash
}

const compare = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash)
}

module.exports = {hash, compare}