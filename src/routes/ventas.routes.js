const { Router } = require("express");
const { getventas, getmiscompras, getmiscompras2, getmiscompras3 } = require('../controllers/ventas.controller');

const router = Router();

router.get('/ventas/:fechainicio/:fechafin', getventas);

router.get('/miscompras/:id', getmiscompras);

router.get('/miscompras/enviadas/:id', getmiscompras2);

router.get('/miscompras/pendientes/:id', getmiscompras3);

module.exports = router;
