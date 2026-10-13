const Student = require('../model/Student')
const Teacher = require('../model/Teacher')
const Course = require('../model/Course')
const Enrollment = require('../model/Enrollment')
const Grade = require('../model/Grade')
const Attendance = require('../model/Attendance')

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

module.exports = {
    getDashboardStats
}