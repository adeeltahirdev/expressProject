const joi = require('joi')

const registerSchema = joi.object({
    name: joi.string().trim().required(),

    email: joi.string().email().trim().required(),

    password: joi.string().min(8).required()
})

const loginSchema = joi.object({
    email: joi.string().email().trim().required(),

    password: joi.string().required()
})

const forgotPasswordSchema = joi.object({
    email: joi.string().email().trim().required()
})

const resetPasswordSchema = joi.object({
    newPassword: joi.string().min(8).required()
})

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema
}