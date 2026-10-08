const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    enrollmentDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    }
})

module.exports = mongoose.model('Enrollment', enrollmentSchema)