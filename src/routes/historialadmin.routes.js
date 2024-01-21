const express = require('express');
const router = express.Router();

const { ObtenerHistorialAdmin } = require('../controllers/historialadmin.controller.js');

router.get('/ver-historialbueno/:anio/:mes', ObtenerHistorialAdmin);

module.exports = router;
