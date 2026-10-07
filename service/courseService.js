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

const getCourseById = async (courseId) => {
    const course = await Course.findById(courseId)

    if (!course) {
        throw new AppError('Course not found', 404)
    }

    return course
}

const updateCourse = async (courseId, courseData) => {
    const course = await Course.findById(courseId)
    
    if (!course) {
        throw new AppError('Course not found', 404)
    }

    Object.assign(course, courseData)

    await course.save()

    return course
}

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse
}