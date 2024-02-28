// es una forma de mandar errores mas organizado nomas
const resError = (res, status, message) => {
    res.status(status).json({
        error: true,
        message
    })
}

module.exports = resError;