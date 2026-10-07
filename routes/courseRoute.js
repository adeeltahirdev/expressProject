const express = require('express')
const courseController = require('../controller/courseController')
const validate = require('../middleware/validationMiddleware')
const { createCourseSchema } = require("../validation/courseValidation");


const router = express.Router()

router.post('/', validate(createCourseSchema), courseController.createCourse)

router.get('/', courseController.getCourses)

router.get('/:courseId', courseController.getCourseById)

module.exports = router