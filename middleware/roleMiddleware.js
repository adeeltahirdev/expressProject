const AppError = require('../utils/AppError')

const checkRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role
        
        if (!allowedRoles.includes(userRole)) {
            throw new AppError('Not allowed', 403)
        }

        next()
    }
}

module.exports = checkRoles