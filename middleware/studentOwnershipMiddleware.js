const Student = require('../model/Student')
const AppError = require('../utils/AppError')

const studentOwnershipMiddleware = () => {
    return async (req, res, next) => {
        const student = await Student.findOne({ user: req.user.id })

        if (!student) {
            throw new AppError('student not found', 404)
        }

        if (req.params.studentId && student._id.toString() !== req.params.studentId) {
            throw new AppError('You are not allowed/authorized for this request', 403)
        }

        req.student = student

        next()
    }
}

module.exports = studentOwnershipMiddleware