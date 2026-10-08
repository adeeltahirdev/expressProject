const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
        required: true
    },

    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    grade: {
        type: String,
        required: true,
        trim: true
    },

    remarks: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Grade', gradeSchema)