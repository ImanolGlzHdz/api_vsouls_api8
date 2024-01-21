const { Router } = require("express");
const {getFavoritosCliente, deleteFavoritos,
     postFavoritos, getFavoritosporIdCliente, deleteFavoritossocios, postFavoritossocio}= require('../controllers/favoritos.controller.js');


const router = Router()

router.post('/new/fav', postFavoritos);
router.post('/new/fav/socios', postFavoritossocio);
router.get('/favoritos/:ID_CLIENTE', getFavoritosCliente);
router.get('/favoritos/cli/:ID_CLIENTE', getFavoritosporIdCliente);
router.delete('/delete/fav', deleteFavoritos);
router.delete('/delete/fav/socios', deleteFavoritossocios);

module.exports = router;