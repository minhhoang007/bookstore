const express = require('express');
const router = express.Router();
const controller = require("../controller/books.js")
const validate = require("../validate/book")
// const middleWare = require("../middleware/auth")

router.get('/',  controller.index)

router.get('/create', controller.getCreate)

router.post('/create', validate.postCreate, controller.postCreate)

router.get("/:id/view", controller.view)

router.post('/:id/delete',  controller.delete)

router.get('/:id/edit',  controller.getEdit)

router.post('/:id/edit',  controller.postEdit)



module.exports = router;