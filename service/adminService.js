const bcrypt = require('bcrypt')
const Student = require('../model/Student')
const Teacher = require('../model/Teacher')
const Course = require('../model/Course')
const Enrollment = require('../model/Enrollment')
const Grade = require('../model/Grade')
const Attendance = require('../model/Attendance')
const User = require('../model/User')
const AppError = require('../utils/AppError')

const getDashboardStats = async () => {
    
    const [students, teachers, courses, enrollments, grades, attendances] = await Promise.all([
        Student.countDocuments(),
        Teacher.countDocuments(),
        Course.countDocuments(),
        Enrollment.countDocuments(),
        Grade.countDocuments(),
        Attendance.countDocuments(),
    ])

    return {
        totalStudents: students,
        totalTeachers: teachers,
        totalCourses: courses,
        totalEnrollments: enrollments,
        totalGrades: grades,
        totalAttendances: attendances
    }
}

const getUsersListing = async () => {
    const users = await User.find().select('-password -resetPasswordToken -resetPasswordExpires')

    return users
}

const createAdmin = async (adminData) => {
    const { name, email, password, role } = adminData

    const existingEmail = await User.findOne({ email })

    if (existingEmail) {
        throw new AppError('A user with this email already exists', 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = new User ({
        name,
        email,
        password: hashedPassword,
        role
    })

    await newAdmin.save()

    return {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
    }
}

module.exports = {
    getDashboardStats,
    getUsersListing,
    createAdmin
}