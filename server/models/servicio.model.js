const mongoose = require("mongoose");


const ServicioSchema = new mongoose.Schema({
    nombre_servicio: {
        type: String,
        required: true,
        allowNull: false,
    },
    saldo: {
        type: Number,
        default: 0
    },


}, { timestamps: true, versionKey: false });


const Servicio = new mongoose.model("servicio", ServicioSchema);

module.exports = Servicio;