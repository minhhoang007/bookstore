const express = require('express');
const router = express.Router();

const controller = require("../controller/cart")

router.get("/cart/add/:productId", controller.addToCart)


module.exports = router;