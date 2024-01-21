const { Router } = require("express");
const {
    getPaquetesTodos,
    getPaquetesActivosconproductos,
    deleteproductosdepaquete,
    getPaqueteProductoporid,
    deleteProductoPaquete,
    updateProductoPaquete,
    deletePaquetes,
    updatepaquetes,
    createPaquetes
} = require('../controllers/paquetes.controller.js');


const router = Router()

router.get('/paquetes', getPaquetesTodos)

router.get('/paquetes/productos/:id', getPaqueteProductoporid)

router.get('/paquetes/activos', getPaquetesActivosconproductos)

router.post('/paquetes', createPaquetes)

router.delete('/paquetes/productos/:idprod/:idpaque', deleteproductosdepaquete)

router.post('/paquetes/estatus/:id/:statuspaquete', updatepaquetes)

router.delete('/paquetes/:id', deletePaquetes)

router.delete('/paquete/producto/:id/:idprod', deleteProductoPaquete)

router.put('/paquete/producto/:id/:idprod', updateProductoPaquete)


module.exports = router;