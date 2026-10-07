const express = require('express')
const courseController = require('../controller/courseController')
const validate = require('../middleware/validationMiddleware')
const { createCourseSchema, updateCourseSchema } = require("../validation/courseValidation");


const router = express.Router()

router.post('/', validate(createCourseSchema), courseController.createCourse)

router.get('/', courseController.getCourses)

router.get('/:courseId', courseController.getCourseById)

router.patch('/:courseId', validate(updateCourseSchema), courseController.updateCourse)

router.delete('/:courseId', courseController.deleteCourse)

module.exports = router