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

module.exports = {
    createTeacher
}