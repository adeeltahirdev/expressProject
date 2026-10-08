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

const getStudents = async () => {
    const students = await Student.find().populate('user', 'name email role')

    return students
}

const getStudentById = async (studentId) => {
    const student = await Student.findById(studentId).populate('user', 'name email role')

    if (!student) {
        throw new AppError('Student not found', 404)
    }

    return student
}

const updateStudent = async (studentId, studentData) => {
    const student = await Student.findById(studentId)

    if (!student) {
        throw new AppError('Student not found', 404)
    }

    Object.assign(student, studentData)

    await student.save()

    return student
}

const deleteStudent = async (studentId) => {
    const student = await Student.findById(studentId)

    if (!student) {
        throw new AppError('Student not found', 404)
    }

    await student.deleteOne()

    return student
}

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}