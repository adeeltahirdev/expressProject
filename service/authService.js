const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const registeruser = async (userData) => {
    const { name, email, password} = userData

    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User ({
        name,
        email,
        password: hashedPassword
    })

    await newUser.save()

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    }

    console.log('Registering User: ', userData)

    return {
        message: 'User registeered successfully'
    }
}

const loginUSer = async (userData) => {
    const { email, password} = userData

    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
)

    return {
        token
    }
}

module.exports = {
    registeruser,
    loginUSer
}