const express = require('express');
const router = express.Router();

const { actualizarVenta, obtenerVentasSinValidar, obtenerVentasSinValidarsocios,actualizarVentasocios } = require('../controllers/validacionventa.controller.js');

router.get('/ventas-pendientes', obtenerVentasSinValidar);

router.put('/validar-venta/:id', actualizarVenta);

// socios

router.get('/ventas-pendientes-socios', obtenerVentasSinValidarsocios);

router.put('/validar-venta-socios/:idcliente/:idventa', actualizarVentasocios);

module.exports = router;
