const express = require('express')
const enrollmentController = require('../controller/enrollmentController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const { createEnrollmentSchema, updateEnrollmentSchema} = require('../validation/enrollmentValidation')

const router = express.Router()

router.post('/', authMiddleware, checkRoles('admin', 'superadmin'), validate(createEnrollmentSchema), enrollmentController.createEnrollment)

router.get('/', authMiddleware, checkRoles('admin', 'superadmin'), enrollmentController.getEnrollments)

router.get('/:enrollmentId', authMiddleware, checkRoles('admin', 'superadmin'), enrollmentController.getEnrollmentById)

router.patch('/:enrollmentId', authMiddleware, checkRoles('admin', 'superadmin'), validate(updateEnrollmentSchema), enrollmentController.updateEnrollment)

router.delete('/:enrollmentId', authMiddleware, checkRoles('admin', 'superadmin'), enrollmentController.deleteEnrollment)

module.exports = router