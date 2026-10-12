const attendanceService = require("../service/attendanceService");

const createAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body)

    res.status(201).json({
        message: 'Attendance marked successfully',
        attendance
    })
  } catch (err) {
    next(err);
  }
};

const getAttendances = async (req, res, next) => {
  try {
    const attendances = await attendanceService.getAttendances()

    res.status(200).json({
        attendances
    })
  } catch (err) {
    next(err);
  }
};

const getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getAttendanceById(req.params.attendanceId)

    res.status(200).json({
        attendance
    })
  } catch (err) {
    next(err);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.updateAttendance(req.params.attendanceId, req.body, req.user)

    res.status(200).json({
        message: 'Attendance updated successfully',
        attendance
    })
  } catch (err) {
    next(err);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.deleteAttendance(req.params.attendanceId)

    res.status(200).json({
        message: 'Attendance deleted successfully',
        attendance
    })
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createAttendance,
    getAttendances,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
}