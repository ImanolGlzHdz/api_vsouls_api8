const { Router } = require("express");
const {getReviewClave, postReview, getReviewMax, getReviewMin, getReviewRecientes, getReviewCant } = require('../controllers/review.controller.js');


const router = Router()

router.get('/review/:CLAVE_P', getReviewClave)
router.get('/reviewCant/:CLAVE_P', getReviewCant)
router.get('/reviewMin/:CLAVE_P', getReviewMin)
router.get('/reviewMax/:CLAVE_P', getReviewMax)
router.get('/reviewRecientes/:CLAVE_P', getReviewRecientes)
router.post('/new/review', postReview)

module.exports = router;