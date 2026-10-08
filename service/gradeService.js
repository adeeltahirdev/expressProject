const Grade = require('../model/Grade')
const Enrollment = require('../model/Enrollment')
const AppError = require('../utils/AppError')

const createGrade = async (gradeData) => {
    const { enrollment } = gradeData

    const existingEnrollment = await Enrollment.findById(enrollment)

    if (!existingEnrollment) {
        throw new AppError('Enrollment not found', 404)
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
    .populate('enrollment', 'enrollmentDate status')

    return grades
}

const getGradeById = async (gradeId) => {
    const grade = await Grade.findById(gradeId)
    .populate('enrollment', 'enrollmentDate status')

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

module.exports = {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade
}