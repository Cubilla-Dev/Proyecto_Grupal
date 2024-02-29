const express = require('express');
const routerServicio = express.Router();

const servicioController = require('../controllers/servicio.controller')

/* Rutas de servicio */
routerServicio.post("/pago", servicioController.pagoServicio);
routerServicio.get("/history/:id", servicioController.historyTranf);
routerServicio.post("/crear", servicioController.crearServicio);
module.exports = routerServicio;