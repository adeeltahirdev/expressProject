require('dotenv').config()
const express = require('express')
const app = express()
const authRoute = require('./routes/authRoute')
const connectDB = require('./config/db')

app.use(express.json())

// connection to Database
connectDB()

app.use('/auth', authRoute)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})