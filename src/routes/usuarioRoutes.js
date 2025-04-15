const express = require("express")
const {registrar, login, perfil} = require("../controllers/usuarioController")
const router = express.Router()
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

require('dotenv').config()



router.post("/registrar", registrar)
router.post("/login", login);
router.get("/perfil", authMiddleware, perfil)


module.exports = router
