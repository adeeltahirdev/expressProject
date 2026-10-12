const express = require('express')
const courseController = require('../controller/courseController')
const gradeController = require('../controller/gradeController')
const validate = require('../middleware/validationMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')
const { createCourseSchema, updateCourseSchema } = require("../validation/courseValidation");


const router = express.Router()

router.post('/', authMiddleware, checkRoles('admin', 'superadmin'), validate(createCourseSchema), courseController.createCourse)

router.get('/', authMiddleware, courseController.getCourses)

router.get('/:courseId', authMiddleware, courseController.getCourseById)

router.get('/:courseId/teachers', authMiddleware, checkRoles('admin', 'superadmin'), courseController.getTeachersByCourse)

router.get('/:courseId/students', authMiddleware, checkRoles('admin', 'superadmin'), courseController.getStudentsByCourse)

router.get('/:courseId/grades', authMiddleware, checkRoles('admin', 'superadmin'), gradeController.getGradesByCourse)

router.get('/:courseId/members', authMiddleware, checkRoles('admin', 'superadmin'), courseController.getCourseMembers)

router.patch('/:courseId', authMiddleware, checkRoles('admin', 'superadmin'), validate(updateCourseSchema), courseController.updateCourse)

router.delete('/:courseId', authMiddleware, checkRoles('admin', 'superadmin'), courseController.deleteCourse)

module.exports = router