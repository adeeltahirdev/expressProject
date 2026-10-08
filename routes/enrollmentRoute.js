const express = require('express')
const enrollmentController = require('../controller/enrollmentController')
const validate = require('../middleware/validationMiddleware')
const { createEnrollmentSchema, updateEnrollmentSchema} = require('../validation/enrollmentValidation')

const router = express.Router()

router.post('/', validate(createEnrollmentSchema), enrollmentController.createEnrollment)

module.exports = router