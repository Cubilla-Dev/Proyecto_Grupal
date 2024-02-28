const express = require('express');
const routerCuenta = express.Router();
const cuentaController = require('../controllers/cuenta.controller')

/* Rutas de creacion de cuenta*/
routerCuenta.post("", cuentaController.crearCuenta);

module.exports = routerCuenta;