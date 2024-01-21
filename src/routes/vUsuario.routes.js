const { Router } = require("express");
const { postVUsuario } = require('../controllers/validarUsuario.controller.js');

const router = Router()

router.post('/vUsuario', postVUsuario)


module.exports = router;