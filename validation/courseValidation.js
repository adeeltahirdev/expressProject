const joi = require('joi')

const createCourseSchema = joi.object({
  courseCode: joi.string().trim().required(),

  courseName: joi.string().trim().required(),

  description: joi.string().trim().allow(""),

  credits: joi.number().integer().min(1).required(),
});

module.exports = {
    createCourseSchema
}