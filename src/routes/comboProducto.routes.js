const { Router } = require("express");
const { getCmbProducto } = require('../controllers/comboProducto.controller.js');

const router = Router()

router.get('/cmbProd', getCmbProducto)



module.exports = router;