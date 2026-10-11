const express = require('express')
const studentController = require('../controller/studentController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const { createStudentSchema, updateStudentSchema } = require('../validation/studentValidation')

const router = express.Router()

router.post('/', authMiddleware, checkRoles('admin', 'superadmin'), validate(createStudentSchema), studentController.createStudent)

router.get('/', authMiddleware, checkRoles('admin', 'superadmin'), studentController.getStudents)

router.get('/:studentId', authMiddleware, checkRoles('admin', 'superadmin'), studentController.getStudentById)

router.patch('/:studentId', authMiddleware, checkRoles('admin', 'superadmin'), validate(updateStudentSchema), studentController.updateStudent)

router.delete('/:studentId', authMiddleware, checkRoles('admin', 'superadmin'), studentController.deleteStudent)

module.exports = router