const { Router } = require("express");
const { postObtenerToken } = require('../controllers/obtnerToken.controller.js');

const router = Router()

router.post('/token', postObtenerToken)


module.exports = router;