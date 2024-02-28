// es una forma de generalizar los try catch
// es para manejar los try catch para no tener muchos
const catchedAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res).catch(err => next(err))
    }
}

module.exports = catchedAsync;