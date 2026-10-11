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

const updateAttendance = async (attendanceId, attendanceData) => {
    const attendance = await Attendance.findById(attendanceId)

    if (!attendance) {
        throw new AppError('Attendance not found', 404)
    }

    const updateData = { ...attendanceData };

    if (updateData.date) {
        const normalizedDate = new Date(updateData.date);
        normalizedDate.setUTCHours(0, 0, 0, 0);
        updateData.date = normalizedDate;
    }

    Object.assign(attendance, updateData);

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