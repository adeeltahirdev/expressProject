require('dotenv').config()
const express = require('express')
const app = express()
const authRoute = require('./routes/authRoute')
const connectDB = require('./config/db')
const errorMiddleware = require('./middleware/errorMiddleware')

app.use(express.json())

// connection to Database
connectDB()

app.use('/auth', authRoute)

// Error handling middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})