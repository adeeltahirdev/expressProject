const joi = require('joi')

const createAdminSchema = joi.object({
    name: joi.string().trim().required(),

    email: joi.string().email().trim().required(),

    password: joi.string().min(8).required(),

    role: joi.string().valid('admin', 'superadmin').required()
})

module.exports = {
    createAdminSchema
}