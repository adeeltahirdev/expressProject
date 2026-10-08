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

const getStudents = async (req, res, next) => {
    try {
        const students = await studentService.getStudents()

        res.status(200).json({
            students
        })
    } catch (err) {
        next(err)
    }
}

const getStudentById = async (req, res, next) => {
    try {
      const student = await studentService.getStudentById(req.params.studentId);

      res.status(200).json({
        student,
      });
    } catch (err) {
      next(err);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const student = await studentService.updateStudent(req.params.studentId, req.body)

        res.status(200).json({
            message: 'Student updated successfully',
            student
        })
    } catch (err) {
        next(err)
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const student = await studentService.deleteStudent(req.params.studentId)

        res.status(200).json({
            message: 'Student deleted successfully',
            student
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}