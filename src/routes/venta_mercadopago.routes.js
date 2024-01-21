const { Router } = require("express");
const { getventapendiente, getventafallida, getventaexistosa} = require('../controllers/venta_mp.controller.js');

const router = Router();

router.get('/venta/exitosa/socios/:idlicente', getventaexistosa);
router.get('/venta/pendiente/socios/:idlicente', getventapendiente);
router.get('/venta/fallida/socios/:idlicente', getventafallida);

module.exports = router;
