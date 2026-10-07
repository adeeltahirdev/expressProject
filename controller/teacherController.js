const teacherService = require('../service/teacherService')

const createTeacher = async (req, res, next) => {
    try {
        const teacher = await teacherService.createTeacher(req.body)

        res.status(201).json({
            message: 'Teacher created successfully',
            teacher
        })
    } catch (err) {
        next(err)
    }
}

const getTeachers = async (req, res, next) => {
    try {
        const teachers = await teacherService.getTeachers()

        res.status(200).json({
            teachers
        })
    } catch (err) {
        next(err)
    }
}

const getTeacherById = async (req, res, next) => {
    try {
        const teacher = await teacherService.getTeacherById(req.params.teacherId)

        res.status(200).json({
            teacher
        })
    } catch (err) {
        next(err)
    }
}

const updateTeacher = async (req, res, next) => {
    try {
        const teacher = await teacherService.updateTeacher(req.params.teacherId, req.body)

        res.status(200).json({
            message: 'Teacher updated successfully',
            teacher
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher
}