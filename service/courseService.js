const Course = require('../model/Course')
const AppError = require('../utils/AppError')

const createCourse = async (courseData) => {
    const { courseCode } = courseData

    const existingCourse = await Course.findOne({ courseCode })

    if (existingCourse) {
        throw new AppError('Course code already exists', 409)
    }

    const course = await Course.create(courseData)

    return course
}

const getCourses = async () => {
    const courses = await Course.find()

    return courses
}

module.exports = {
    createCourse,
    getCourses
}