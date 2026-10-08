require('dotenv').config()
const express = require('express')
const app = express()
const authRoute = require('./routes/authRoute')
const courseRoute = require('./routes/courseRoute')
const teacherRoute = require('./routes/teacherRoute')
const studentRoute = require('./routes/studentRoute')
const enrollmentRoute = require('./routes/enrollmentRoute')
const connectDB = require('./config/db')
const errorMiddleware = require('./middleware/errorMiddleware')

app.use(express.json())

// connection to Database
connectDB()

// App's routes
app.use('/auth', authRoute)
app.use('/courses', courseRoute)
app.use('/teachers', teacherRoute)
app.use('/students', studentRoute)
app.use('/enrollments', enrollmentRoute)

// Error handling middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})