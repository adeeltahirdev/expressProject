const express = require('express')
const adminController = require('../controller/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const validation = require('../middleware/validationMiddleware')
const {createAdminSchema} = require('../validation/adminValidation')
const checkRoles = require('../middleware/roleMiddleware')

const router = express.Router()

router.get('/dashboard', authMiddleware, checkRoles('admin', 'superadmin'), adminController.getDashboardStats)

router.get('/users', authMiddleware, checkRoles('admin', 'superadmin'), adminController.getUsersListing)

router.post('/users', authMiddleware, checkRoles('superadmin'), validation(createAdminSchema), adminController.createAdmin)

module.exports = router