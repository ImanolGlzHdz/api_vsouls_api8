const { Router } = require("express");
const {getBuscador } = require('../controllers/buscador.controller.js');

const router = Router()

router.get('/buscador/autocompletar/:P_QUERY', getBuscador)


module.exports = router;
