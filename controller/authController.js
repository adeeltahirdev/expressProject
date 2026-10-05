const authService = require('../service/authService')

const register = async (req, res) => {
    const result = await authService.registeruser(req.body)
    
    res.status(201).json(result)
}

const login = async (req, res) => {
    const result = await authService.loginUSer(req.body)
    
    res.status(201).json(result)
}

module.exports = {
    register,
    login
}