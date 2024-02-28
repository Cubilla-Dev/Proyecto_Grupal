// es para poder mandar errores personalizados 
// lo puedes personalizar a tu gusto cada error
class ClientError extends Error{
    constructor(message, status = 400){
        super(message);
        this.statusCode = status
    }
}

module.exports = { ClientError }