const express = require('express');
const { postTarefa, getTarefa, updateTarefa, deleteTarefa } = require('../controllers/tarefaController');
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);

router.post('/',authMiddleware, postTarefa)
router.get('/', authMiddleware, getTarefa)
router.delete('/:id', authMiddleware, deleteTarefa)
router.put('/:id', authMiddleware, updateTarefa)
module.exports = router;
