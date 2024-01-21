const { Router } = require("express");
const { getDireccion, getDireccionUsuario, getTotalDirecciones,
postDireccion, putDireccion, deleteDireccion } = require('../controllers/direccion.controller.js');

const router = Router()

router.get('/direccion/get/:ID_DIRECCION', getDireccion)

router.get('/direccion/:ID_USUARIO', getDireccionUsuario)

router.get('/direccion/total/:ID_USUARIO', getTotalDirecciones)


router.post('/direccion', postDireccion)


router.put('/direccion', putDireccion)

router.delete('/direccion', deleteDireccion)

module.exports = router;