const { Router } = require("express");
const {postEnviarMensaje, getChat, getChatId, postChat, ActualizarChat, deleteChat } = require('../controllers/chat.controller.js');

const router = Router()

router.post('/chat/enviarMensaje', postEnviarMensaje)

router.get('/chat/get', getChat)

router.get('/chat/getId/:id', getChatId)

router.post('/chat/post', postChat)

router.put('/chat/Actualizar', ActualizarChat)

router.delete('/chat/delete', deleteChat)




module.exports = router;