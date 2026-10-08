const Enrollment = require('../model/Enrollment')
const Student = require('../model/Student')
const Course = require('../model/Course')
const AppError = require('../utils/AppError')

const createEnrollment = async (enrollmentData) => {
    const { student, course } = enrollmentData

    const existingStudent = await Student.findById(student)

    if (!existingStudent) {
        throw new AppError('Student not found', 404)
    }

    const existingCourse = await Course.findById(course)

    if (!existingCourse) {
        throw new AppError('Course not found', 404)
    }

    const existingEnrollment = await Enrollment.findOne({
        student,
        course
    })

    if (existingEnrollment) {
        throw new AppError('Student is already enrolled in this course', 409)
    }

    const enrollment = await Enrollment.create(enrollmentData)

    return enrollment
}

module.exports = {
    createEnrollment
}