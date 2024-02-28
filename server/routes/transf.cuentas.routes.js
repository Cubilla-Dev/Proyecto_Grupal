const express = require('express');
const routerTrasnf = express.Router();
const transfController = require('../controllers/transf.controller')

/* Rutas de transferencia */
routerTrasnf.post("", transfController.transfCuentas);

module.exports = routerTrasnf;