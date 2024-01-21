const { Router } = require("express");
const { getUsuario, postCorreos, postUsuario, ActualizarPerfil } = require('../controllers/cliente.controller.js');

const router = Router()

router.get('/cliente/:P_ID_USUARIO', getUsuario)

router.post('/cliente/post', postCorreos)

router.post('/cliente/', postUsuario)

router.put('/cliente/put/', ActualizarPerfil) // CAMBIAR EN PROYECTO



module.exports = router;