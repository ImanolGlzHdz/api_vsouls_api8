const { Router } = require("express");
const { getOfertaC,getOfertaReciente } = require('../controllers/ofertaC.controller.js');

const router = Router()

router.get('/ofertaC', getOfertaC);
router.get('/ofertasNew', getOfertaC);



module.exports = router;