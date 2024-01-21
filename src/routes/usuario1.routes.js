const { Router } = require("express");
const { getRoutes, postRoutes, putRoutes, deleteRoutes } = require('../controllers/usuarios1.controller.js')

const router = Router()

router.get('/api', getRoutes)


router.post('/api/insertarUsuario', postRoutes)


router.put('/api/contrasenaUsuario', putRoutes)

router.delete('/api', deleteRoutes)

module.exports = router;