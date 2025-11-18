const UnauthorizedAccessError = require('../exceptions/UnauthorizedAccessError')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user')

const verifyLogin  = async(request, response, next) => {
    let token = request.get('Authorization')

    if (!token) {
        return next(new UnauthorizedAccessError('Invalid or missing token'))
    }

    if (token.startsWith('Bearer ')) {
        token = token.replace('Bearer ', '')
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(verifiedToken.id)

    if (!user) {
        return next(new UnauthorizedAccessError('User soes not exist!'))
    }

    user.id = user._id.toString()
    request.auth.user = user

    next();
}

module.exports = verifyLogin