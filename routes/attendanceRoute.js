const express = require('express')
const attendanceController = require('../controller/attendanceController')
const validate = require('../middleware/validationMiddleware')
const { createAttendanceSchema, updateAttendanceSchema } = require('../validation/attendanceValidation')

const router = express.Router()

router.post('/', validate(createAttendanceSchema), attendanceController.createAttendance)

router.get('/', attendanceController.getAttendances)

router.get('/:attendanceId', attendanceController.getAttendanceById)

router.patch('/:attendanceId', validate(updateAttendanceSchema), attendanceController.updateAttendance)

router.delete('/:attendanceId', attendanceController.deleteAttendance)

module.exports = router