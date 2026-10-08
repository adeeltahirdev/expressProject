const joi = require('joi')

const createEnrollmentSchema = joi.object({
  student: joi.string().hex().length(24).required(),

  course: joi.string().hex().length(24).required(),

  enrollmentDate: joi.date().required(),

  status: joi.string().valid('active', 'completed', 'dropped').default('active')
});

const updateEnrollmentSchema = joi.object({
    enrollmentDate: joi.date(),

    status: joi.string().valid('active', 'completed', 'dropped')
}).min(1)

module.exports = {
    createEnrollmentSchema,
    updateEnrollmentSchema
}