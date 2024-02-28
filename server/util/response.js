// para mandar los json a front para tenerlo mas organizado y siguiend una forma
const response = (res, statusCode, data) => {
    res.status(statusCode).json({
        error: false,
        data
    })
}


module.exports = response;