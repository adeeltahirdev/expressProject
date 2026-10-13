const adminService = require('../service/adminService')

const getDashboardStats = async (req, res, next) => {
    try {
        const dashboardStats = await adminService.getDashboardStats()

        res.status(200).json({
            dashboardStats
        })
    } catch (err) {
        next(err)
    }
}

const getUsersListing = async (req, res, next) => {
    try {
        const users = await adminService.getUsersListing()

        res.status(200).json({
            users
        })
    } catch (err) {
        next(err)
    }
}

const createAdmin = async (req, res, next) => {
    try {
        const userAdmin = await adminService.createAdmin(req.body)

        res.status(201).json({
            message: 'Admin created successfully',
            userAdmin
        })
    } catch (err) {
        next(err)
    }
}

const updateUserRole = async (req, res, next) => {
    try {
        const user = await adminService.updateUserRole(req.params.userId, req.body.role)

        res.status(200).json({
            message: 'Role updated successfully',
            user
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getDashboardStats,
    getUsersListing,
    createAdmin,
    updateUserRole
}