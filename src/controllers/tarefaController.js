const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const postTarefa = async (req, res) => {
    const { titulo, descricao } = req.body;
  
    try {
      const novaTarefa = await prisma.tarefas.create({
        data: {
          titulo,
          descricao,
          usuarioId: req.usuario.id,
        },
      });
  
      res.status(201).json(novaTarefa);
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro); // 👈 MOSTRA o erro real no terminal
      res.status(500).json({ erro: "Erro ao criar tarefa" });
    }
  };
  
  
  const getTarefa = async (req, res) => {
    try {
      const tarefas = await prisma.tarefas.findMany({
        where: { usuarioId: req.usuario.id },
      });
      res.json(tarefas);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao buscar tarefas" });
    }
  };
  
  const updateTarefa = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
  
    try {
      const tarefa = await prisma.tarefas.update({
        where: {
          id: parseInt(id),
          usuarioId: req.usuario.id,
        },
        data: { titulo, descricao },
      });
  
      res.json(tarefa);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao atualizar tarefa" });
    }
  };
  
  const deleteTarefa = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.tarefas.delete({
        where: {
          id: parseInt(id),
          usuarioId: req.usuario.id,
        },
      });
  
      res.json({ mensagem: "Tarefa excluída com sucesso" });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao excluir tarefa" });
    }
  };
  
module.exports = {postTarefa, getTarefa, updateTarefa, deleteTarefa}