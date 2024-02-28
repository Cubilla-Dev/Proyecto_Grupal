const resError = (res, message, statusCode) => {
    res.status(statusCode).json({
        error: true,
        message
    })
}

module.exports = resError;