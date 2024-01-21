const { Router } = require("express");
const { getOfertaA, postOfertaA, putOfertaA, deleteOfertaA } = require('../controllers/ofertaA.controller.js');

const router = Router()

router.get('/ofertaA', getOfertaA)


router.post('/ofertaA', postOfertaA)


router.put('/ofertaA', putOfertaA)

router.delete('/ofertaA', deleteOfertaA)

module.exports = router;