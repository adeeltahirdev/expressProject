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

    if (!existingUser.isActive) {
        throw new AppError('Cannot create a profile for an inactive user', 403)
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

const getTeachers = async () => {
    const teachers = await Teacher.find().populate('user', 'name email role').populate('course', 'courseCode courseName credits')

    return teachers
}

const getTeacherById = async (teacherId) => {
    const teacher = await Teacher.findById(teacherId)
      .populate("user", "name email role")
      .populate("course", "courseCode courseName credits")

    if (!teacher) {
        throw new AppError('Teacher not found', 404)
    }

    return teacher
}

const updateTeacher = async (teacherId, teacherData) => {
    const teacher = await Teacher.findById(teacherId)

    if (!teacher) {
        throw new AppError('teacher not found', 404)
    }

    if (teacherData.course) {
        const existingCourse = await Course.findById(teacherData.course)

        if (!existingCourse) {
            throw new AppError('Course not found', 404)
        }
    }

    Object.assign(teacher, teacherData)

    await teacher.save()

    return teacher
}

const deleteTeacher = async (teacherId) => {
    const teacher = await Teacher.findById(teacherId)

    if (!teacher) {
        throw new AppError('Teacher not found', 404)
    }

    const user = await User.findById(teacher.user)

    if (!user) {
        throw new AppError('Asoociated user not found', 404)
    }

    user.isActive = false

    await user.save()

    return {
        teacherId: teacher._id,
        userId: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive
    }
}

module.exports = {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}