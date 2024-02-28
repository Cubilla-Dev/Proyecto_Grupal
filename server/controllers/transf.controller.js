const {ClientError} = require('../util/error')
const catchedAsync = require('../util/catched.Async')
const response = require('../util/response')

const User = require('../models/user.model')
const Transferencia = require('../models/transferencia.model')

const transfController = {
    transfCuentas: catchedAsync(  async (req, res) => {
        const { amountSent, senderUserId, receiverUserId } = req.body;

        const cantidadDinero = parseFloat(amountSent);

        const verifiCuentaRemite = await User.findOne({_id: senderUserId})
        const verifiCuentaDesti = await User.findOne({_id: receiverUserId})

        if(!verifiCuentaRemite){
            throw new ClientError('Cuenta no encontrada', 403)
        }
        //obteniendo el monto del dinero de la cuenta del remitente
        const verifiSaldo = verifiCuentaRemite.wallet;
        const firstName = verifiCuentaDesti.firstName;
        const lastName = verifiCuentaDesti.lastName;
        
        if(verifiSaldo < amountSent){
            throw new ClientError('Cantidad de dinero insuficiente', 403)
        }

        //modificando la cuenta de destino con el dinero que recibio
        const actualizarCuenta = await User.findOneAndUpdate(
            { _id: receiverUserId},
            //inc incrementa o decrementa el valor de ese campo
            { $inc: { wallet: cantidadDinero}},
            { new: true }
        )

        if(actualizarCuenta){
            await User.findOneAndUpdate(
                { _id: senderUserId},
                //inc incrementa o decrementa el valor de ese campo
                { $inc: { wallet: (-1 * cantidadDinero)}},
                { new: true }
            )
            //guardando la transferencia
            const nuevaTransf = await new Transferencia({ 
                nbr_completo_destina: `${firstName} ${lastName}`,
                cuenta_destinatario: receiverUserId,
                cuenta_remitente: senderUserId,
                monto: amountSent,
            });
            nuevaTransf.save();
        }

        if(!actualizarCuenta){
            throw new ClientError('Hubo un error en la transferencia', 409)
        }

        response(res, 200, {
            message: 'Tranferencia realizada correctamente'
        })
    }),
    historyTranf: catchedAsync(async (req, res) => {
        const senderUserId = req.params.id;
        const sendMoneyRecords = await Transferencia.find({ cuenta_remitente: senderUserId });  
        console.log('datos del historial ',sendMoneyRecords)

        response(res, 200, sendMoneyRecords)
    })
}

module.exports = transfController;