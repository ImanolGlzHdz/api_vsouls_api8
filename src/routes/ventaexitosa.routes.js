const express = require('express');
const router = express.Router();

const { insertarVentaCliente, ventaExitosa, limpiarCarrito, insertarVentaClienteSnC } = require('../controllers/ventaexitosa.controllers.js');

router.get('/venta-exit/:idUser', ventaExitosa)
router.post('/insertar-venta/:idUsuario/:totalVenta/:ID_CLIENTE', insertarVentaCliente)
router.post('/insertar-ventaSnC/:idUsuario/:totalVenta', insertarVentaClienteSnC)
router.delete('/borrar-carro/:idUsuario', limpiarCarrito)

module.exports = router;