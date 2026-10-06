const bcrypt = require('bcrypt')
const crypto = require('crypto')
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

const generateResetToken = async (email) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('User not found')
    }

    const resetToken = crypto.randomBytes(64).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000

    await user.save()

    const resetUrl = `http://localhost:3500/auth/reset-password/${resetToken}`

    console.log(`Password reset link: ${resetUrl}`)
}

const resetPassword = async (resetToken, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        throw new Error('Invalid or expired reset token')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword

    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    return {
        message: 'Password reset successfully'
    }
}

module.exports = {
    registeruser,
    loginUSer,
    generateResetToken,
    resetPassword
}