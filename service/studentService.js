const Student = require('../model/Student')
const User = require('../model/User')
const AppError = require('../utils/AppError')

const createStudent = async (studentData) => {
    const { user } = studentData

    const existingUser = await User.findById(user)

    if (!existingUser) {
        throw new AppError('User not found', 404)
    }

    if (existingUser.role !== 'student') {
        throw new AppError('User does not have student role', 403)
    }

    const existingStudent = await Student.findOne({ user })

    if (existingStudent) {
        throw new AppError('Student already exists', 409)
    }

    const student = await Student.create(studentData)

    return student
}

module.exports = {
    createStudent
}