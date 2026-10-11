const mongoose =  require('mongoose')

const attendanceSchema = new mongoose.Schema({
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['absent', 'present', 'leave'],
        required: true
    }
})

attendanceSchema.index(
    {enrollment: 1, date: 1},
    {unique: true}
)

module.exports = mongoose.model('Attendance', attendanceSchema)