const joi = require('joi')

const createAttendanceSchema = joi.object({
    enrollment: joi.string().hex().length(24).required(),

    date: joi.date().required(),

    status: joi.string().trim().required()
})

const updateAttendanceSchema = joi.object({
    date: joi.date(),

    status: joi.string().trim()
}).min(1)

module.exports = {
    createAttendanceSchema,
    updateAttendanceSchema
}