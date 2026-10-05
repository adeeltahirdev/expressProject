const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to Database successfully')
    }
    catch (err) {
        console.error('Error connecting to Database: ', err)
    }
}

module.exports = connectDB