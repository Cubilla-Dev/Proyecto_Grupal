// const mongoose = require("mongoose");


// const CuentaSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         primaryKey: true,
//         defaultValue: () => uuidv4()
//     },
//     nombre_completo: {
//         type: String,
//         required: true,
//         allowNull: false,
//     },
//     nro_documento: {
//         type: Number,
//         required: true,
//         allowNull: false    
//     },
//     numero_cuenta: {
//         type: Number,
//         required: true,
//         allowNull: false    
//     },
//     direccion: {
//         type: String,
//         required: true,
//         allowNull: false    
//     },
//     saldo_cuenta: {
//         type: Number,
//         required: true,
//         allowNull: false,
//     }


// }, { timestamps: true, versionKey: false });


// const Cuenta = new mongoose.model("Cuenta", CuentaSchema);

// module.exports = Cuenta;