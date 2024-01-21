const { Router } = require("express");
const { getRol, postRol, putRol, deleteRol, getRolId } = require('../controllers/rol.controller.js');

const router = Router()

router.get('/rol', getRol)


router.post('/rol', postRol)


router.put('/rol', putRol)

router.delete('/rol', deleteRol)

router.get('/rolId/:id', getRolId)

module.exports = router;