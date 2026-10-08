const studentService = require('../service/studentService')

const createStudent = async (req, res, next) => {
    try {
        const student = await studentService.createStudent(req.body)

        res.status(201).json({
            message: 'Student created successfully',
            student
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createStudent
}