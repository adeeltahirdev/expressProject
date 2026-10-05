const express = require('express')
const app = express()
const authRoute = require('./routes/authRoute')

app.use(express.json())
app.use('/auth', authRoute)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})