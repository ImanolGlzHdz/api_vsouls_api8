const express = require('express');
const router = express.Router();

const { verStatusVenta, agregarGuiaVenta } = require('../controllers/statusventa.controller.js');

router.get('/ver-status-venta/:status', verStatusVenta);
router.put('/agregar-guia-venta/:idVenta/:numGuia', agregarGuiaVenta);

module.exports = router;
