const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    credits: {
        type: Number,
        required: true,
        min: 1
    }
})

module.exports = mongoose.model('Course', courseSchema)