const express = require('express')
const router = express.Router();
const controlador = require('./controller')
const { setup } = require('./db')

router.get("/", controlador.listUsers)

router.post("/", controlador.createUsers)
router.post("/:id", controlador.updateUsers)
router.delete("/:id", controlador.deleteUsers)
router.get("/:id", controlador.getUsers)
router.put("/", controlador.login)



router.get("/setup", setup)

module.exports = router;