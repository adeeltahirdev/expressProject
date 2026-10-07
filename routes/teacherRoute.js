const express = require('express')
const teacherController = require('../controller/teacherController')
const validate = require('../middleware/validationMiddleware')
const {createTeacherSchema} = require('../validation/teacherValidation')

const router = express.Router()

router.post('/', validate(createTeacherSchema), teacherController.createTeacher)

module.exports = router