const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const authMiddleware = require('../middleware/authMiddleware')
const validate = require('../middleware/validationMiddleware')
const authValidation = require('../validation/authValidation')

router.post('/register', validate(authValidation.registerSchema), authController.register)

router.post('/login', validate(authValidation.loginSchema), authController.login)

router.get('/loggedUser', authMiddleware, authController.loggedUser)

router.post('/forgot-password', validate(authValidation.forgotPasswordSchema), authController.forgotPassword)

router.post('/reset-password/:resetToken', validate(authValidation.resetPasswordSchema), authController.resetPassword)

module.exports = router