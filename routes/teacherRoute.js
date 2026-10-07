const express = require('express')
const teacherController = require('../controller/teacherController')
const validate = require('../middleware/validationMiddleware')
const {createTeacherSchema, updateTeacherSchema} = require('../validation/teacherValidation')

const router = express.Router()

router.post('/', validate(createTeacherSchema), teacherController.createTeacher)

router.get('/', teacherController.getTeachers)

router.get('/:teacherId', teacherController.getTeacherById)

router.patch('/:teacherId', validate(updateTeacherSchema), teacherController.updateTeacher)

module.exports = router