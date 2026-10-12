const Attendance = require('../model/Attendance')
const Enrollment = require('../model/Enrollment')
const AppError = require('../utils/AppError')

const createAttendance = async (attendanceData) => {
    const {enrollment} = attendanceData
    const normalizeDate = new Date(attendanceData.date)
    normalizeDate.setUTCHours(0, 0, 0, 0)

    const existingEnrollment = await Enrollment.findById(enrollment)

    if (!existingEnrollment) {
        throw new AppError('Enrollment not found', 404)
    }

    const existingAttendance = await Attendance.findOne({
        enrollment,
        date: normalizeDate
    })

    if (existingAttendance) {
        throw new AppError('Attendance has been marked already', 409)
    }

    const attendance = await Attendance.create({
        ...attendanceData,
        date: normalizeDate
    })

    return attendance
}

const getAttendances = async () => {
    const attendances = await Attendance.find()

    return attendances
}

const getAttendanceById = async (attendanceId) => {
    const attendance = await Attendance.findById(attendanceId)

    if (!attendance) {
        throw new AppError('Attendance not found', 404)
    }

    return attendance
}

const updateAttendance = async (attendanceId, attendanceData, user) => {
    const attendance = await Attendance.findById(attendanceId)

    if (!attendance) {
        throw new AppError('Attendance not found', 404)
    }

    if (user.role === 'teacher') {
        const teacher = await Teacher.findOne({ user: user.id })

        if (!teacher) {
            throw new AppError('Teacher profile not found', 404)
        }

        const enrollment = await Enrollment.findById(attendance.enrollment)

        if (!enrollment) {
            throw new AppError('Enrollment not found', 404)
        }

        if (enrollment.course.toString() !== teacher.course.toString()) {
            throw new AppError(
                'You can only update attendance for your assigned course',
                403
            )
        }
    }

    const updateData = {}

    if (attendanceData.date !== undefined) {
        const normalizedDate = new Date(attendanceData.date)
        normalizedDate.setUTCHours(0, 0, 0, 0)
        updateData.date = normalizedDate
    }

    if (attendanceData.status !== undefined) {
        updateData.status = attendanceData.status
    }

    const enrollmentId = attendance.enrollment
    const attendanceDate = updateData.date ?? attendance.date

    const conflictingAttendance = await Attendance.findOne({
        _id: { $ne: attendance._id },
        enrollment: enrollmentId,
        date: attendanceDate
    })

    if (conflictingAttendance) {
        throw new AppError(
            'Attendance has already been marked for this enrollment and date',
            409
        )
    }

    Object.assign(attendance, updateData)
    await attendance.save()

    return attendance
}

const deleteAttendance = async (attendanceId) => {
    const attendance = await Attendance.findById(attendanceId)

    if (!attendance) {
        throw new AppError('Attendance not found', 404)
    }

    await attendance.deleteOne()

    return attendance
}

module.exports = {
    createAttendance,
    getAttendances,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
}