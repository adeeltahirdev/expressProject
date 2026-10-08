const enrollmentService = require('../service/enrollmentService')

const createEnrollment = async (req, res, next) => {
    try {
        const enrollment = await enrollmentService.createEnrollment(req.body)

        res.status(201).json({
            message: 'Student enrolled seccussfully',
            enrollment
        })
    } catch (err) {
        next(err)
    }
}

const getEnrollments = async (req, res, next) => {
    try {
        const enrollments = await enrollmentService.getEnrollments();

        res.status(200).json({
          enrollments,
        });
    } catch (err) {
        next(err)
    }
}

const getEnrollmentById = async (req, res, next) => {
    try {
        const enrollment = await enrollmentService.getEnrollmentById(
          req.params.enrollmentId,
        );

        res.status(200).json({
          enrollment,
        });
    } catch (err) {
        next(err)
    }
}

const updateEnrollment = async (req, res, next) => {
    try {
        const enrollment = await enrollmentService.updateEnrollment(req.params.enrollmentId, req.body)

        res.status(200).json({
            message: 'Enrollment updated successfully',
            enrollment
        })
    } catch (err) {
        next(err)
    }
}

const deleteEnrollment = async (req, res, next) => {
    try {
        const enrollment = await enrollmentService.deleteEnrollment(req.params.enrollmentId)

        res.status(200).json({
            message: 'Enrollment deleted successfully',
            enrollment
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createEnrollment,
    getEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
}