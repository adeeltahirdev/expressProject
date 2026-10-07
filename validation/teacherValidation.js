const joi = require('joi')

const createTeacherSchema = joi.object({
  user: joi.string().hex().length(24).required(),

  firstName: joi.string().trim().required(),

  lastName: joi.string().trim().required(),

  phone: joi.string().trim().required(),

  qualification: joi.string().trim().required(),

  hireDate: joi.date().required(),

  course: joi.string().hex().length(24).required()
});

const updateTeacherSchema = joi.object({

  firstName: joi.string().trim(),

  lastName: joi.string().trim(),

  phone: joi.string().trim(),

  qualification: joi.string().trim(),

  hireDate: joi.date(),

  course: joi.string().hex().length(24)
}).min(1)


module.exports = {
    createTeacherSchema,
    updateTeacherSchema
}