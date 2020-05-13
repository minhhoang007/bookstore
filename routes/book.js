const express = require('express');
const router = express.Router();
const controller = require("../controller/books.js")
const validate = require("../validate/book")
const middleWare = require("../middleware/auth")

router.get('/', middleWare.requireAuth, controller.index)

router.get('/create', middleWare.requireAuth ,controller.getCreate)

router.post('/create', middleWare.requireAuth ,validate.postCreate, controller.postCreate)

router.get("/:id/view", controller.view)

router.get('/:id/delete', middleWare.requireAuth, controller.delete)

router.get('/:id/edit', middleWare.requireAuth, controller.getEdit)

router.post('/:id/edit', middleWare.requireAuth, controller.postEdit)



module.exports = router;