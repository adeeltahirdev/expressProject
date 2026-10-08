const gradeService = require('../service/gradeService')

const createGrade = async (req, res, next) => {
    try {
        const grade = await gradeService.createGrade(req.body)

        res.status(201).json({
            message: 'Grade added successfully',
            grade
        })
    } catch (err) {
        next(err)
    }
}

const getGrades = async (req, res, next) => {
    try {
        const grades = await gradeService.getGrades()

        res.status(200).json({
            grades
        })
    } catch (err) {
        next(err)
    }
}

const getGradeById = async (req, res, next) => {
    try {
        const grade = await gradeService.getGradeById(req.params.gradeId)

        res.status(200).json({
            grade
        })
    } catch (err) {
        next(err)
    }
}

const updateGrade = async (req, res, next) => {
    try {
        const grade = await gradeService.updateGrade(req.params.gradeId, req.body)

        res.status(200).json({
            message: 'Grade updated successfully',
            grade
        })
    } catch (err) {
        next(err)
    }
}

const deleteGrade = async (req, res, next) => {
    try {
        const grade = await gradeService.deleteGrade(req.params.gradeId)

        res.status(200).json({
            message: 'Grade deleted successfully',
            grade
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade
}