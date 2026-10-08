const enrollmentService = require('../service/enrollmentService')

const createEnrollment = async (req, res, next) => {
    try {
        const enrollment = await enrollmentService.createEnrollment(req.body)

        res.status(201).json({
            message: 'Student Enrolled seccussfully',
            enrollment
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createEnrollment
}