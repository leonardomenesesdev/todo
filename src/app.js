const express = require('express');
const rotasTarefas = require('./routes/tarefaRoutes');
const app = express()
app.use(express.json())
app.use('/tarefas', rotasTarefas)
module.exports = app;
