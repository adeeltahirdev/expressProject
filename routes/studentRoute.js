const express = require('express')
const studentController = require('../controller/studentController')
const validate = require('../middleware/validationMiddleware')
const { createStudentSchema, updateStudentSchema } = require('../validation/studentValidation')

const router = express.Router()

router.post('/', validate(createStudentSchema), studentController.createStudent)

router.get('/', studentController.getStudents)

router.get('/:studentId', studentController.getStudentById)

module.exports = router