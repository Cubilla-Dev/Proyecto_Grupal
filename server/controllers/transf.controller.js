const {ClientError} = require('../util/error')
const catchedAsync = require('../util/catched.Async')
const response = require('../util/response')

const Cuenta = require('../models/cuenta.model')
const Transferencia = require('../models/transferencia.model')

const transfController = {
    transfCuentas: catchedAsync(  async (req, res) => {
        const {cuent_destino, cuent_remitente, nomb_completo_desti, can_dinero, nro_documento } = req.body;
        const cantidadDinero = parseFloat(can_dinero);

        const verifiCuentaRemite = await Cuenta.findOne({numero_cuenta: cuent_remitente})
        const verifiCuentaDesti = await Cuenta.findOne({numero_cuenta: cuent_destino})

        if(!verifiCuentaRemite){
            throw new ClientError('Cuenta no encontrada', 403)
        }
        //obteniendo el monto del dinero de la cuenta del remitente
        const verifiSaldo = verifiCuentaRemite.saldo_cuenta;
        const nbr_completo_remite = verifiCuentaRemite.nombre_completo;
        
        if(verifiSaldo < can_dinero){
            throw new ClientError('Cantidad de dinero insuficiente', 403)
        }
        
        if(!(Number(nro_documento) === verifiCuentaDesti.nro_documento && nomb_completo_desti === verifiCuentaDesti.nombre_completo)){
            throw new ClientError('Numero de documento con el nombre no coiciden', 403)
        }

        //modificando la cuenta de destino con el dinero que recibio
        const actualizarCuenta = await Cuenta.findOneAndUpdate(
            { numero_cuenta: cuent_destino},
            //inc incrementa o decrementa el valor de ese campo
            { $inc: { saldo_cuenta: cantidadDinero}},
            { new: true }
        )

        if(actualizarCuenta){
            await Cuenta.findOneAndUpdate(
                { numero_cuenta: cuent_remitente},
                //inc incrementa o decrementa el valor de ese campo
                { $inc: { saldo_cuenta: (-1 * cantidadDinero)}},
                { new: true }
            )
        }

        if(!actualizarCuenta){
            throw new ClientError('Hubo un error en la transferencia', 409)
        }

        //guardando la transferencia
        const nuevaTransf = await new Transferencia({ 
            nbr_completo_destina: nomb_completo_desti,
            nbr_completo_remite: nbr_completo_remite,
            cuenta_destinatario: cuent_destino,
            cuenta_remitente: cuent_remitente,
            monto: can_dinero,
        });

        nuevaTransf.save();

        response(res, 200, actualizarCuenta)
    })
}

module.exports = transfController;