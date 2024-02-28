const mongoose = require("mongoose");


const TransferenciaSchema = new mongoose.Schema({
    id: {
        type: String,
        primaryKey: true,
        defaultValue: () => uuidv4()
    },
    nbr_completo_destina: {
        type: String,
        required: true,
        allowNull: false,
    },
    nbr_completo_remite: {
        type: String,
        required: true,
        allowNull: false,
    },
    cuenta_remitente: {
        type: Number,
        required: true,
        allowNull: false    
    },
    cuenta_destinatario: {
        type: Number,
        required: true,
        allowNull: false    
    },
    monto: {
        type: Number,
        required: true,
        allowNull: false,
    },


}, { timestamps: true, versionKey: false });


const Transferencia = new mongoose.model("Historial_tranferecia", TransferenciaSchema);

module.exports = Transferencia;