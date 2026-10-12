const Grade = require('../model/Grade')
const Enrollment = require('../model/Enrollment')
const Teacher = require('../model/Teacher')
const AppError = require('../utils/AppError')
const Course = require('../model/Course')

const createGrade = async (gradeData) => {
    const { enrollment } = gradeData

    const existingEnrollment = await Enrollment.findById(enrollment)

    if (!existingEnrollment) {
        throw new AppError('Enrollment not found', 404)
    }

    const assignedTeacher = await Teacher.findOne({
        _id: gradeData.assignedBy,
        course: existingEnrollment.course
    })

    if (!assignedTeacher) {
        throw new AppError('Teacher is not assigned to this course', 403)
    }

    const existingGrade = await Grade.findOne({ enrollment })

    if (existingGrade) {
        throw new AppError('Grade already exist for this enrollment', 409)
    }

    const grade = await Grade.create(gradeData)

    return grade
}

const getGrades = async () => {
    const grades = await Grade.find()
    .populate({
        path: 'enrollment',
        populate: [
            {
                path: 'student',
                select: 'firstName lastName'
            },
            {
                path: 'course',
                select: 'courseCode courseName' 
            }
        ]
    })
    .populate({
        path: 'assignedBy',
        select: 'firstName lastName qualification'
    })

    return grades
}

const getGradeById = async (gradeId) => {
    const grade = await Grade.findById(gradeId)
    .populate({
        path: 'enrollment',
        populate: [
            {
                path: 'student',
                select: 'firstName lastName'
            },
            {
                path: 'course',
                select: 'courseCode courseName' 
            }
        ]
    })
    .populate({
        path: 'assignedBy',
        select: 'firstName lastName qualification'
    })

    if (!grade) {
        throw new AppError('Grade not found', 404)
    }

    return grade
}

const updateGrade = async (gradeId, gradeData) => {
    const grade = await Grade.findById(gradeId)

    if (!grade) {
        throw new AppError('Grade not found', 404)
    }

    Object.assign(grade, gradeData)

    await grade.save()

    return grade
}

const deleteGrade = async (gradeId) => {
    const grade = await Grade.findById(gradeId)

    if (!grade) {
        throw new AppError('Grade not found', 404)
    }

    await grade.deleteOne()

    return grade
}

const getGradesByCourse = async (courseId) => {
    const course = await Course.findById(courseId)

    if (!course) {
        throw new AppError('Course not found', 404)
    }

    const enrollments = await Enrollment.find({ course: courseId }).select('_id')

    const enrollmentIds = enrollments.map(enrollment => enrollment._id)

    const grades = await Grade.find({
        enrollment: { $in: enrollmentIds}
    })
    .populate({
        path: 'enrollment',
        populate: {
            path: 'student',
            select: 'firstName lastName'
        }
    })
    .populate({
        path: 'assignedBy',
        select: 'firstName lastName qualification'
    })

    return grades
}

module.exports = {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade,
    getGradesByCourse
}