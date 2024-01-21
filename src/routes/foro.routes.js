const { Router } = require("express");
const { getmensajes, enviarmensaje } = require('../controllers/foro.controller.js');

const router = Router()

router.get('/mensajes/:id', getmensajes)

router.post('/mensajes', enviarmensaje)


module.exports = router;