const { Router } = require("express");
const {getmisComprasCliente} = require('../controllers/compras.cliente.controller.js');

const router = Router()


router.get('/miscompras/:ID_USUARIO', getmisComprasCliente)



module.exports = router;