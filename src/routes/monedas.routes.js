const { Router } = require("express");
const { getMonedas, updateMonedas, updatemonedascliente, getMonedas_CLIENTE, updatepuntos, updateintercambiosocios } = require('../controllers/monedas.controller.js');

const router = Router()

router.get('/monedas', getMonedas)

router.get('/monedas/cli/:id_cliente', getMonedas_CLIENTE)

router.get('/monedas/cli/update/:id_cliente/:monedas', updatemonedascliente)

router.put('/monedas', updateMonedas)

router.put('/puntos/socios', updateintercambiosocios)

router.put('/puntos/productos', updatepuntos)

module.exports = router;