
const errorMiddleware = (err, req, res, next) => {
    
    console.error(err.stack)

    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'

    if (err.name === 'CastError') {
        statusCode = 400
        message = 'Invalid ID format'
    }

    if (err.code === 11000) {
        statusCode = 409
        message = 'A record with this value already exists'
    }

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error'
    })
    
}

module.exports = errorMiddleware