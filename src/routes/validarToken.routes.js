const { Router } = require("express");
const { postvalidarToken } = require('../controllers/validarToken.controller.js');

const router = Router()

router.post('/validarToken', postvalidarToken)



module.exports = router;