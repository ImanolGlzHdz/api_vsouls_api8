const { Router } = require("express");
const { getOfertaId } = require('../controllers/mostrarOfertaId.controller.js');

const router = Router()

router.get('/mostrarOferta/:id', getOfertaId)


module.exports = router;