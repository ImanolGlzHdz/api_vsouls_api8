const { Router } = require("express");

const {
    getNiveles,
    createNiveles,
    getNivelesidsocio,
    updateNiveles,
    deleteNiveles,
    getNivelesid
} = require('../controllers/niveles.controller.js');

const router = Router()

router.get('/niveles', getNiveles)

router.get('/niveles/:id', getNivelesid)

router.post('/niveles', createNiveles)

router.put('/niveles/:id', updateNiveles)

router.delete('/niveles/:id', deleteNiveles)

router.get('/niveles/socio/:id', getNivelesidsocio)

module.exports = router;