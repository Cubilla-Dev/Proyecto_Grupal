const {ClientError} = require('../util/error')
const catchedAsync = require('../util/catched.Async')
const response = require('../util/response')
const numero_cuenta = require('../util/numero.cuenta')

const Cuenta = require('../models/cuenta.model')

const cuentaController = {
    crearCuenta: catchedAsync(  async (req, res) => {
        const { nombre_completo, nro_documento, direccion, saldo_cuenta } = req.body;
        
        const verifiCuenta = await Cuenta.findOne({ nro_documento });
        
        if(verifiCuenta){
            throw new ClientError('Numero de documento ya registrado', 409)
        }

        const nuevaCuenta = new Cuenta({
            nombre_completo,
            numero_cuenta: numero_cuenta(),
            nro_documento,
            direccion,
            saldo_cuenta
        });

        await nuevaCuenta.save();

        response(res, 200, { message: 'Usuario creado satisfactoriamente'})
    })
}

module.exports = cuentaController;