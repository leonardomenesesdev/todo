const express = require('express');
const { postTarefa, getTarefa, updateTarefa, deleteTarefa } = require('../controllers/tarefaController');
const router = express.Router()
router.post('/', postTarefa)
router.get('/', getTarefa)
router.delete('/:id', deleteTarefa)
router.put('/:id', updateTarefa)
module.exports = router;
