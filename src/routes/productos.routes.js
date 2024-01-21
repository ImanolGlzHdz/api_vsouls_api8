const { Router } = require("express");

const {getProducts,getProductsM, getProductsClave, getProductosActivos,putProductos, getProductos, getproductosconpaquetes,getSearchProductos,getSearchProductosA } = require('../controllers/productos.controller.js');

const router = Router()

router.get('/products', getProducts)
router.get('/productsM', getProductsM)
router.get('/products/:CLAVE_P', getProductsClave)
router.get('/productosActivos', getProductosActivos)
router.put('/update/productos/:CLAVE_P', putProductos)

router.get('/productos', getProductos)
router.get('/productos/buscador/:texto', getSearchProductos)
router.get('/productosA/buscador/:texto', getSearchProductosA)

router.get('/productos/paq', getproductosconpaquetes)



module.exports = router;