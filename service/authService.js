const bcrypt = require('bcrypt')
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
    console.log('logging in User: ', userData)

    return {
        message: 'User logged in successfully'
    }
}

module.exports = {
    registeruser,
    loginUSer
}