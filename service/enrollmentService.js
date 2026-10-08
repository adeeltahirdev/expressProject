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

const getEnrollments = async () => {
    const enrollments = await Enrollment.find().populate('student', 'firstName lastName').populate('course', 'courseCode courseName')

    return enrollments

}

const getEnrollmentById = async (enrollmentId) => {
    const enrollment = await Enrollment.findById(enrollmentId).populate('student', 'firstName lastName').populate('course', 'courseCode courseName')

    if (!enrollment) {
        throw new AppError('Enrollment not found', 404)
    }

    return enrollment
}

const updateEnrollment = async (enrollmentId, enrollmentData) => {
    const enrollment = await Enrollment.findById(enrollmentId)
      .populate("student", "firstName lastName")
      .populate("course", "courseCode courseName");

    if (!enrollment) {
        throw new AppError('Enrollment not found', 404)
    }

    Object.assign(enrollment, enrollmentData)

    await enrollment.save()

    return enrollment
}

module.exports = {
    createEnrollment,
    getEnrollments,
    getEnrollmentById,
    updateEnrollment
}