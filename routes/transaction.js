const express = require('express');
const router = express.Router();
const controller = require("../controller/transaction.js")
const middleWare = require("../middleware/auth")
const validate = require("../validate/transaction")

router.get("/transaction", middleWare.requireAuth,controller.index)

router.get("/transaction/create", middleWare.requireAuth, controller.getCreate)

router.post('/transaction/create', validate.postTransaction, middleWare.requireAuth, controller.postCreate)

router.get('/transaction/:id/delete', middleWare.requireAuth, controller.delete)


module.exports = router;