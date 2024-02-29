const {ClientError} = require('../util/error')
const catchedAsync = require('../util/catched.Async')
const response = require('../util/response')

const Servicio = require('../models/servicio.model')
const User = require('../models/user.model')
const Transferencia = require('../models/transferencia.model')

const servicioController = {
    pagoServicio: catchedAsync(  async (req, res) => {
        const { monto_pagar, user_id, id_servicio } = req.body;

        const cantidadDinero = parseFloat(monto_pagar);
        const verifiCuentaRemite = await User.findOne({_id: user_id})
        const verifiCuentaDesti = await Servicio.findOne({_id: id_servicio})
        
        // if(verifiServicio.length == 0){
            //     throw new ClientError('Cuenta no encontrada', 403)
            // }
            //obteniendo el monto del dinero de la cuenta del remitente
            
        const verifiSaldo = verifiCuentaRemite.wallet;
        const nombre_servicio = verifiCuentaDesti.nombre_servicio;

        if(verifiSaldo < monto_pagar){
            throw new ClientError('Cantidad de dinero insuficiente', 403)
        }

        //modificando la cuenta de destino con el dinero que recibio
        const actualizarCuenta = await Servicio.findOneAndUpdate(
            { _id: id_servicio},
            //inc incrementa o decrementa el valor de ese campo
            { $inc: { saldo: cantidadDinero}},
            { new: true }
        )
        console.log(actualizarCuenta)

        if(actualizarCuenta){
            await User.findOneAndUpdate(
                { _id: user_id},
                //inc incrementa o decrementa el valor de ese campo
                { $inc: { wallet: (-1 * cantidadDinero)}},
                { new: true }
                )
                //guardando la transferencia
                
            const histoTrans = await new Transferencia({ 
                nbr_completo_destina: nombre_servicio,
                cuenta_destinatario: id_servicio,
                cuenta_remitente: user_id,
                monto: monto_pagar,
            });
            histoTrans.save();
        }

        if(!actualizarCuenta){
            throw new ClientError('Hubo un error en la transferencia', 409)
        }

        response(res, 200, {
            message: 'Servicio pagado correctamente'
        })
    }),

    historyTranf: catchedAsync(async (req, res) => {
        const senderUserId = req.params.id;
        const sendMoneyRecords = await Transferencia.find({ cuenta_remitente: senderUserId });  
        console.log('datos del historial ',sendMoneyRecords)

        response(res, 200, sendMoneyRecords)
    }),

    crearServicio: catchedAsync(async (req, res) => {
        const {nombre_servicio} = req.body;
        const verifiServicio = await Servicio.find({ nombre_servicio });

        // Verificar si el servicio ya existe
        if (verifiServicio.length > 0) {
            throw new ClientError('El servicio ya ha sido creado', 403);
        }
        const servicioCreado = await new Servicio({ 
            nombre_servicio: nombre_servicio,
            // saldo: 0,
        });
        await servicioCreado.save();

        response(res, 200, {
            message: 'Servicio creado con exito'
        })
    })
}

module.exports = servicioController;