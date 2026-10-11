const express = require('express')
const courseController = require('../controller/courseController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const { createCourseSchema, updateCourseSchema } = require("../validation/courseValidation");


const router = express.Router()

router.post('/', authMiddleware, checkRoles('admin', 'superadmin'), validate(createCourseSchema), courseController.createCourse)

router.get('/', authMiddleware, courseController.getCourses)

router.get('/:courseId', authMiddleware, courseController.getCourseById)

router.patch('/:courseId', authMiddleware, checkRoles('admin', 'superadmin'), validate(updateCourseSchema), courseController.updateCourse)

router.delete('/:courseId', authMiddleware, checkRoles('admin', 'superadmin'), courseController.deleteCourse)

module.exports = router