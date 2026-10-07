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

const getCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getCourses()

        res.status(200).json({
            courses
        })
    } catch (err) {
        next(err)
    }
}

const getCourseById = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.courseId)

        res.status(200).json({
            course
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createCourse,
    getCourses,
    getCourseById
}