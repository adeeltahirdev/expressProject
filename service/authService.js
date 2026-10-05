
const registeruser = async (userData) => {
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