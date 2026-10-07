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

const getCourse = async (req, res, next) => {
    try {
        const courses = await courseService.getCourses()

        res.status(200).json({
            courses
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createCourse,
    getCourse
}