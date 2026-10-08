const express = require('express')
const gradeController = require('../controller/gradeController')
const validate = require('../middleware/validationMiddleware')
const { createGradeSchema, updateGradeSchema } = require('../validation/gradeValidation')

const router = express.Router()

router.post('/', validate(createGradeSchema), gradeController.createGrade)

router.get('/', gradeController.getGrades)

router.get('/:gradeId', gradeController.getGradeById)

router.patch('/:gradeId', validate(updateGradeSchema), gradeController.updateGrade)

router.delete('/:gradeId', gradeController.deleteGrade)

module.exports = router