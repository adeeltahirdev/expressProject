const jwt = require('jsonwebtoken')
const User = require('../model/User')

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'You are not authorized'
        })
    }

    const token = authHeader.split(' ')[1]

let decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }

    try {
        const user = await User.findById(decoded.id)

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: 'Account is unavailable'
            })
        }
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (err) {
        next(err)
    }
}


module.exports = authMiddleware