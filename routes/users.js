const express = require('express');
const router = express.Router();
const controller = require("../controller/users.js")
const validate = require("../validate/users")
const middleware = require("../middleware/auth")


router.get('/',  controller.index)

router.get('/create',  controller.getCreate)

router.post('/create', validate.postCreate, controller.postCreate)

router.get("/:id/view", middleware.requireAuth, controller.view)

router.get("/:id/edit", middleware.requireAuth, controller.getEdit) 

router.post('/:id/edit', middleware.requireAuth, controller.postEdit)

router.get('/:id/delete', middleware.requireAuth, controller.delete)


module.exports = router;