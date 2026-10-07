const joi = require('joi')

const createTeacherSchema = joi.object({
  user: joi.string().hex().length(24).required,

  firstName: joi.string().trim().required(),

  lastName: joi.string().trim().required(),

  phone: joi.string().trim().required(),

  qualification: joi.string().trim().required(),

  hireDate: joi.date().required(),

  course: joi.string().hex().length(24).required
});


module.exports = {
    createTeacherSchema
}