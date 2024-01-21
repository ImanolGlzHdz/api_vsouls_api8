const { Router } = require("express");
const { getUsuariosid, getListadeSubsocios, getUsuarios,postsocionuevo } = require('../controllers/usuarios-controller.js');

const router = Router();

router.get('/usuario/socios', getUsuarios);
router.get('/usuario/:id', getUsuariosid);
router.get('/usuario/subsocio/:id', getListadeSubsocios);

router.post('/usuario/new/subsocio/:correo/:contrasenia/:idsocio', postsocionuevo);

module.exports = router;
