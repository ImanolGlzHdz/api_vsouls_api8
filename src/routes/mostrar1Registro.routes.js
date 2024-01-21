const { Router } = require("express");
const { post1Registro } = require('../controllers/mostrar1Registro.controller.js');

const router = Router()

router.post('/mostrarRegistro', post1Registro)


module.exports = router;