const express = require('express')
const adminController = require('../controller/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoles = require('../middleware/roleMiddleware')

const router = express.Router()

router.get('/', authMiddleware, checkRoles('admin', 'superadmin'), adminController.getDashboardStats)

module.exports = router