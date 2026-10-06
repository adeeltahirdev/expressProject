const authService = require('../service/authService')

const register = async (req, res) => {
    const result = await authService.registeruser(req.body)
    
    res.status(201).json(result)
}

const login = async (req, res) => {
    const result = await authService.loginUSer(req.body)
    
    res.status(201).json(result)
}

const loggedUser = (req, res) => {
    res.status(200).json({
        user: req.user
    })
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        await authService.generateResetToken(email)

        res.json({
            message: 'Password reset link generated and sent to your email'
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params
        const { newPassword } = req.body

        const result = await authService.resetPassword(resetToken, newPassword)

        res.json(result)
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = {
    register,
    login,
    loggedUser,
    forgotPassword,
    resetPassword
}