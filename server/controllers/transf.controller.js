const ClientError = require('../util/catched.Async')
const catchedAsync = require('../util/catched.Async')
const response = require('../util/response')

const User = require('../models/user.model')
const Transferencia = require('../models/transferencia.model')

const transfController = {
    transfCuentas: catchedAsync(  async (req, res) => {
        const {n_cuenta, nomb_completo, can_dinero, nro_documento, } = req.body;

    })
}

module.exports = transfController;