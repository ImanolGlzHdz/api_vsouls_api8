const { Router } = require("express");
const { getRegistroAdmin, postRegistroAdmin, putRegistroAdmin, deleteRegistroAdmin } = require('../controllers/registroAdmin.controller.js');

const router = Router()

router.get('/registroAdmin/:rol', getRegistroAdmin)


router.post('/registroAdmin', postRegistroAdmin)


router.put('/registroAdmin', putRegistroAdmin)

router.delete('/registroAdmin', deleteRegistroAdmin)

module.exports = router;