const Teacher = require('../model/Teacher')
const User = require('../model/User')
const Course = require('../model/Course')
const AppError = require('../utils/AppError')

const createTeacher = async (teacherData) => {
    const { user, course } = teacherData

    const existingUser = await User.findById(user)

    if (!existingUser) {
        throw new AppError('user not found', 404);
        
    }

    if (existingUser.role !== 'teacher') {
        throw new AppError('User does not have teacher role', 403);
        
    }

    const existingTeacher = await Teacher.findOne({ user })

    if (existingTeacher) {
        throw new AppError('Teacher profile already exist', 409)
    }

    const existingCourse = await Course.findById(course)

    if (!existingCourse) {
        throw new AppError('Course not found', 404)
    }

    const teacher = await Teacher.create(teacherData)

    return teacher
}

module.exports = {
    createTeacher
}