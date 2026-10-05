
const register = (req, res) => {
    // Registration logic here
    res.status(201).json({
        message: 'User registered successfully.'
    })
}

const login = (req, res) => {
    // Login logic here
    res.status(201).json({
        message: 'User login successfully.'
    })
}

module.exports = {
    register,
    login
}