const joi = require('joi')

const createCourseSchema = joi.object({
  courseCode: joi.string().trim().required(),

  courseName: joi.string().trim().required(),

  description: joi.string().trim().allow(""),

  credits: joi.number().integer().min(1).required(),
});

const updateCourseSchema = joi.object({
  courseCode: joi.string().trim(),

  courseName: joi.string().trim(),

  description: joi.string().trim().allow(""),

  credits: joi.number().integer().min(1)
}).min(1)

module.exports = {
    createCourseSchema,
    updateCourseSchema
}