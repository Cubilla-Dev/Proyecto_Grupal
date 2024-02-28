const ClientError = require('../util/catched.Async')
const catchedAsync = require('../util/catched.Async')
const response = require('../util/response')

//TODO: FALTA LA CREACION DEL MODELO CUENTA
const Transferencia = require('../models/transferencia.model')

const transfController = {
    transfCuentas: catchedAsync(  async (req, res) => {
        const {cuent_destino, cuent_remitente, nomb_completo_desti, can_dinero, nro_documento, } = req.body;
        const cantidadDinero = parseFloat(can_dinero);

        const verifiCuenta = await Cuenta.findOne({numero_cuenta: cuent_remitente})

        if(!verifiCuenta){
            throw new ClientError('Cuenta no encontrada', 403)
        }
        //obteniendo el monto del dinero de la cuenta del remitente
        const verifiSaldo = verifiCuenta.saldo_cuenta;
        const nbr_completo_remite = verifiCuenta.nombre_completo;

        if(verifiSaldo < can_dinero){
            throw new ClientError('Cantidad de dinero insuficiente')
        }
        //modificando la cuenta de destino con el dinero que recibio
        const actualizarCuenta = await Cuenta.findOneUpdate(
            { numero_cuenta: cuent_destino},
            //inc incrementa o decrementa el valor de ese campo
            { $inc: { saldo_cuenta: cantidadDinero}},
            { new: true }
        )

        if(!actualizarCuenta){
            throw new ClientError('Hubo un error en la transferencia')
        }

        //guardando la transferencia
        await Transferencia.insertOne({ 
            nbr_completo_destina: nomb_completo_desti,
            nbr_completo_remite: nbr_completo_remite,
            nro_documento: nro_documento,
            cuenta_destinatario: cuent_destino,
            cuenta_remitente: cuent_remitente,
            monto: can_dinero,
        });

        response(res, 200, actualizarCuenta)
    })
}

module.exports = transfController;