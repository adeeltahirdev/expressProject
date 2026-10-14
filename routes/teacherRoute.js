const express = require('express')
const teacherController = require('../controller/teacherController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const {createTeacherSchema, updateTeacherSchema} = require('../validation/teacherValidation')

const router = express.Router()

router.post('/', authMiddleware, checkRoles('superadmin'), validate(createTeacherSchema), teacherController.createTeacher)

router.get('/', authMiddleware, checkRoles('superadmin', 'admin'), teacherController.getTeachers)

router.get('/:teacherId', authMiddleware, checkRoles('superadmin', 'admin'), teacherController.getTeacherById)

router.patch('/:teacherId', authMiddleware, checkRoles('superadmin'), validate(updateTeacherSchema), teacherController.updateTeacher)

router.delete('/:teacherId', authMiddleware, checkRoles('superadmin'), teacherController.deleteTeacher)

module.exports = router