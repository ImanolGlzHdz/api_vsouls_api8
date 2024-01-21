const { Router } = require("express");
const { postMostrarUsuarios } = require('../controllers/mostrarUsuariosA.controller.js');

const router = Router()

router.post('/mostrarUsuarios', postMostrarUsuarios)


module.exports = router;