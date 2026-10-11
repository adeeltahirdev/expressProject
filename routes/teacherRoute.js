const express = require('express')
const teacherController = require('../controller/teacherController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const {createTeacherSchema, updateTeacherSchema} = require('../validation/teacherValidation')

const router = express.Router()

router.post('/', authMiddleware, checkRoles('admin', 'superadmin'), validate(createTeacherSchema), teacherController.createTeacher)

router.get('/', authMiddleware, teacherController.getTeachers)

router.get('/:teacherId', authMiddleware, teacherController.getTeacherById)

router.patch('/:teacherId', authMiddleware, checkRoles('admin', 'superadmin'), validate(updateTeacherSchema), teacherController.updateTeacher)

router.delete('/:teacherId', authMiddleware, checkRoles('admin', 'superadmin'), teacherController.deleteTeacher)

module.exports = router