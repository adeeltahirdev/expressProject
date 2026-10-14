const express = require('express')
const gradeController = require('../controller/gradeController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const { createGradeSchema, updateGradeSchema } = require('../validation/gradeValidation')

const router = express.Router()

router.post('/', authMiddleware, checkRoles('teacher'), validate(createGradeSchema), gradeController.createGrade)

router.get('/', authMiddleware, checkRoles('teacher', 'admin', 'superadmin'), gradeController.getGrades)

router.get('/:gradeId', authMiddleware, checkRoles('teacher', 'admin', 'superadmin'), gradeController.getGradeById)

router.patch('/:gradeId', authMiddleware, checkRoles('teacher', 'superadmin'), validate(updateGradeSchema), gradeController.updateGrade)

router.delete('/:gradeId', authMiddleware, checkRoles('teacher', 'superadmin'), gradeController.deleteGrade)

module.exports = router