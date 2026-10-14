const express = require('express')
const studentController = require('../controller/studentController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const { createStudentSchema, updateStudentSchema } = require('../validation/studentValidation')
const studentOwnershipMiddleware = require('../middleware/studentOwnershipMiddleware')

const router = express.Router()

router.post('/', authMiddleware, checkRoles('superadmin'), validate(createStudentSchema), studentController.createStudent)

router.get('/', authMiddleware, checkRoles('admin', 'superadmin'), studentController.getStudents)

router.get('/me', authMiddleware, checkRoles('student'), studentOwnershipMiddleware(), (req, res) => {
    res.status(200).json({
        student: req.student
    })
})

router.get('/:studentId', authMiddleware, checkRoles('admin', 'superadmin'), studentController.getStudentById)

router.patch('/:studentId', authMiddleware, checkRoles('superadmin'), validate(updateStudentSchema), studentController.updateStudent)

router.delete('/:studentId', authMiddleware, checkRoles('superadmin'), studentController.deleteStudent)

module.exports = router