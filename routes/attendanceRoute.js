const express = require('express')
const attendanceController = require('../controller/attendanceController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const { createAttendanceSchema, updateAttendanceSchema } = require('../validation/attendanceValidation')

const router = express.Router()

router.post('/', authMiddleware, checkRoles('admin', 'superadmin'), validate(createAttendanceSchema), attendanceController.createAttendance)

router.get('/', authMiddleware, checkRoles('admin', 'superadmin'), attendanceController.getAttendances)

router.get('/:attendanceId', authMiddleware, checkRoles('admin', 'superadmin'), attendanceController.getAttendanceById)

router.patch('/:attendanceId', authMiddleware, checkRoles('teacher', 'admin', 'superadmin'), validate(updateAttendanceSchema), attendanceController.updateAttendance)

router.delete('/:attendanceId', authMiddleware, checkRoles('admin', 'superadmin'), attendanceController.deleteAttendance)

module.exports = router