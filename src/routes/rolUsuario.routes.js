const { Router } = require("express");
const { getRolUsuario } = require('../controllers/rolUsuario.controller.js');

const router = Router()

router.get('/rolUsuario/:P_ID_USUARIO', getRolUsuario)

module.exports = router;