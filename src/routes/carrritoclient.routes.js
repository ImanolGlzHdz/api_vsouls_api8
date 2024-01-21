const express = require('express');
const router = express.Router();

const {
  actualizarCantidadesCarro,
  borrarProductoCarrito,
  obtenerDatosCarrito,
  obtenerDisponiblesPorProducto,agregarProductosAlCarro
} = require('../controllers/carritoclient.controller.js');

router.get('/ver-carrito/:idUser', obtenerDatosCarrito);
router.get('/ver-disponibles/:claveProd', obtenerDisponiblesPorProducto);
router.delete('/borrar-producto-carrito/:idUsuario/:claveP', borrarProductoCarrito);
router.put('/actualizar-canti/:user/:clave/:cant', actualizarCantidadesCarro);
router.post('/insertarProductCarro/:iduser/:clavep/:cantc', agregarProductosAlCarro);

module.exports = router;
