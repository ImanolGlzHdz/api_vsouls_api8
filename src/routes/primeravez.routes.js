const {Router} = require('express');
const {
    getlistaprimeravez,
    crearnuevoproductoprimeravez,
    getproductosprimeravez,
    elminarprimeavez,
    editarprimeravez,
    crearprimeravez
} = require('../controllers/primeravez.controller.js');

const router = Router()

router.get('/primeravez', getlistaprimeravez)

router.get('/primeravez/prod/:id', getproductosprimeravez)

router.post('/primeravez/crear/:id/:precio', crearprimeravez)

router.put('/primeravez/editar/:id/:precio', editarprimeravez)

router.delete('/primeravez/eliminar/:id', elminarprimeavez)

router.post('/primeravez/nuevo/:id/:prod', crearnuevoproductoprimeravez)


module.exports = router;