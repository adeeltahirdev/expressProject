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

module.exports = {
    getDashboardStats
}