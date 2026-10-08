const joi = require('joi')

const createGradeSchema = joi.object({
    enrollment: joi.string().hex().length(24).required(),

    marks: joi.number().min(0).max(100).required(),

    grade: joi.string().trim().required(),

    remarks: joi.string().trim().allow('')
})

const updateGradeSchema = joi.object({
    marks: joi.number().min(0).max(100),

    grade: joi.string().trim(),

    remarks: joi.string().trim().allow('')
}).min(1)

module.exports = {
    createGradeSchema,
    updateGradeSchema
}