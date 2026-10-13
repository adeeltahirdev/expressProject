const express = require('express')
const adminController = require('../controller/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const validation = require('../middleware/validationMiddleware')
const {createAdminSchema, updateUserRoleSchema} = require('../validation/adminValidation')
const checkRoles = require('../middleware/roleMiddleware')

const router = express.Router()

router.get('/dashboard', authMiddleware, checkRoles('admin', 'superadmin'), adminController.getDashboardStats)

router.get('/users', authMiddleware, checkRoles('admin', 'superadmin'), adminController.getUsersListing)

router.get('/users/:userId', authMiddleware, checkRoles('admin', 'superadmin'), adminController.getUserById)

router.post('/users', authMiddleware, checkRoles('superadmin'), validation(createAdminSchema), adminController.createAdmin)

router.patch('/users/:userId/role', authMiddleware, checkRoles('superadmin'), validation(updateUserRoleSchema), adminController.updateUserRole)

router.delete('/users/:userId', authMiddleware, checkRoles('superadmin'), adminController.softDeleteUser)

module.exports = router