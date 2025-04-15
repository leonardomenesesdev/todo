const express = require('express');
const rotasTarefas = require('./routes/tarefaRoutes');
const rotasUsuario = require('./routes/usuarioRoutes')
const cors = require('cors'); 
const app = express()
app.use(cors()); 
app.use(express.json())
app.use('/tarefas', rotasTarefas)
app.use('/usuarios', rotasUsuario)
module.exports = app;
