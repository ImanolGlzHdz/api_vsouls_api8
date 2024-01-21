const { Router } = require("express");
const {
    getCarritoProd,
    getCarritoProdpv,
    posteliminarproductosalcarritopv,
    getnumerocarrito,
    postfinalizarventa,
    gettotalproductos,
    gettotalpaquetes,
    posteliminarpaquetesdelcarrito,
    postsumarpaquetesalcarrito,
    postrestarpaquetesalcarrito,
    posteliminarproductosalcarrito,
    postsumarproductosalcarrito,
    restarproductosalcarritodecompras,
    getfinalizarventa,
    gettotaltotal,
    getCarritoPaq,
    createProductosCarritoCompras,
    createPaqueteCarritocompras,
    getobtenerpaquetesnombresolo,
    validarventa,
} = require('../controllers/carritocompras.controller.js');

const router = Router()

router.get('/carrito/num/:id', getnumerocarrito)

router.get('/carrito/:id', getCarritoProd)

router.get('/carrito/prev/:id', getCarritoProdpv)

router.get('/carrito/paquetes/:id', getCarritoPaq)

router.post('/carrito/productos/:idusuario/:claveproducto', createProductosCarritoCompras)

router.post('/carrito/paquetes/:idusuario/:clavepaquete', createPaqueteCarritocompras)

// router.put('/puntos/socios', updateintercambiosocios)

// router.put('/puntos/productos', updatepuntos)

router.get('/carrito/totalpro/:id', gettotalproductos)

router.get('/carrito/totalpaq/:id', gettotalpaquetes)

router.get('/carrito/total/:id', gettotaltotal)

router.get('/carrito/venta/:id', getfinalizarventa)

router.post('/carrito/sumprod/:idusuario/:idproducto',postsumarproductosalcarrito)

router.post('/carrito/resprod/:idusuario/:idproducto', restarproductosalcarritodecompras)

router.post('/carrito/elimprod/:idusuario/:idproducto', posteliminarproductosalcarrito)

router.post('/carrito/elimprodpv/:idusuario/:idproducto', posteliminarproductosalcarritopv)


// PAQUETES

router.post('/carrito/relimpaqu/:idusuario/:idpaquete', posteliminarpaquetesdelcarrito)

router.post('/carrito/sumpaqu/:idusuario/:idpaquete', postsumarpaquetesalcarrito)

router.post('/carrito/respaqu/:idusuario/:idpaquete', postrestarpaquetesalcarrito)

router.get('/carrito/paquete/nombre/:idusuario', getobtenerpaquetesnombresolo)
// finalizarventa

router.post('/carrito/finalizarventa/:idusuario/:statusven/:preciofin', postfinalizarventa)

router.post('/carrito/validarventa', validarventa)

module.exports = router;