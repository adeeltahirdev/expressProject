const joi = require('joi')

const createStudentSchema = joi.object({
  user: joi.string().hex().length(24).required(),

  firstName: joi.string().trim().required(),

  lastName: joi.string().trim().required(),

  phone: joi.string().trim().required(),

  dateOfBirth: joi.date().required(),

  address: joi.string().trim().required(),

  enrollmentDate: joi.date().required()
});

const updateStudentSchema = joi.object({

  firstName: joi.string().trim(),

  lastName: joi.string().trim(),

  phone: joi.string().trim(),

  dateOfBirth: joi.date(),

  address: joi.string().trim(),

  enrollmentDate: joi.date()
}).min(1)

module.exports = {
    createStudentSchema,
    updateStudentSchema
}