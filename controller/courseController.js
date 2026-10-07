const courseService = require('../service/courseService')

const createCourse = async (req, res, next) => {
    try {
        const course = await courseService.createCourse(req.body)

        res.status(201).json({
            message: 'Course created successfully',
            course
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createCourse
}