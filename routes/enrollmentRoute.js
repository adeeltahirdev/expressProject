const express = require('express')
const enrollmentController = require('../controller/enrollmentController')
const validate = require('../middleware/validationMiddleware')
const { createEnrollmentSchema, updateEnrollmentSchema} = require('../validation/enrollmentValidation')

const router = express.Router()

router.post('/', validate(createEnrollmentSchema), enrollmentController.createEnrollment)

router.get('/', enrollmentController.getEnrollments)

router.get('/:enrollmentId', enrollmentController.getEnrollmentById)

router.patch('/:enrollmentId', validate(updateEnrollmentSchema), enrollmentController.updateEnrollment)

router.delete('/:enrollmentId', enrollmentController.deleteEnrollment)

module.exports = router