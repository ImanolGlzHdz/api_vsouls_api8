const { Router } = require("express");
const { getVendedor, postVendedor, postComisionesG, postDetalleComision } = require('../controllers/vendedor.controller.js');

const router = Router()

router.get('/vendedor/get/:P_ID_USUARIO', getVendedor)

router.post('/vendedor/InsertarC', postVendedor)

router.post('/vendedor/ComisionesG', postComisionesG)


router.post('/vendedor/ID/', postDetalleComision)


module.exports = router;