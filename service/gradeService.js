const Grade = require('../model/Grade')
const Enrollment = require('../model/Enrollment')
const Teacher = require('../model/Teacher')
const AppError = require('../utils/AppError')
const Course = require('../model/Course')

const createGrade = async (gradeData, user) => {
    const { enrollment } = gradeData

    const existingEnrollment = await Enrollment.findById(enrollment)

    if (!existingEnrollment) {
        throw new AppError('Enrollment not found', 404)
    }

    const teacher = await Teacher.findOne({ user: user.id })

    if (!teacher) {
        throw new AppError('Teacher profile not found', 404)
    }

    if (teacher.course.toString() !== existingEnrollment.course.toString()) {
        throw new AppError(
            'You can only grade students enrolled in your assigned course',
            403
        )
    }

    const existingGrade = await Grade.findOne({ enrollment })

    if (existingGrade) {
        throw new AppError('Grade already exists for this enrollment', 409)
    }

    const grade = await Grade.create({
        ...gradeData,
        assignedBy: teacher._id
    })

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

const updateGrade = async (gradeId, gradeData, user) => {
    const grade = await Grade.findById(gradeId)

    if (!grade) {
        throw new AppError('Grade not found', 404)
    }

    if (user.role === 'teacher') {
        const teacher = await Teacher.findOne({ user: user.id })

        if (!teacher) {
            throw new AppError('Teacher profile not found', 404)
        }

        const enrollment = await Enrollment.findById(grade.enrollment)

        if (!enrollment) {
            throw new AppError('Enrollment not found', 404)
        }

        if (teacher.course.toString() !== enrollment.course.toString()) {
            throw new AppError(
                'You can only update grades for your assigned course',
                403
            )
        }
    }

    if (gradeData.marks !== undefined) {
        grade.marks = gradeData.marks
    }

    if (gradeData.grade !== undefined) {
        grade.grade = gradeData.grade
    }

    if (gradeData.remarks !== undefined) {
        grade.remarks = gradeData.remarks
    }

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