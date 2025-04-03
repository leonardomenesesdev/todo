const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const postTarefa = async (req, res) => {
    const { titulo, descricao, status } = req.body;
//TEMPORARIO'1
    try {
        // Criar usuário padrão se não existir
        let usuarioPadrao = await prisma.usuario.findFirst({ where: { email: "teste@exemplo.com" } });

        if (!usuarioPadrao) {
            usuarioPadrao = await prisma.usuario.create({
                data: {
                    email: "teste@exemplo.com",
                    senha: "123456", // Senha fictícia
                    nome: "Usuário Padrão"
                }
            });
        }

        // Criar tarefa associada ao usuário padrão
        const novaTarefa = await prisma.tarefas.create({
            data: {
                titulo,
                descricao,
                status,
                usuarioId: usuarioPadrao.id
            }
        });

        res.status(201).json({ message: "Tarefa criada!", novaTarefa });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getTarefa = async(req, res) => {
    try {
        const allTarefas = await prisma.tarefas.findMany()
        res.json(allTarefas)
    } catch (error) {
        res.status(500).json({ error: "erro no get de tarefas" });
    }
}
const updateTarefa = async(req, res) => {
    const {id} = req.params
    const {titulo, descricao, status} = req.body
    try {
        const tarefa = await prisma.tarefas.update({
            where: {id: parseInt(id)},
            data:{titulo, descricao, status}
        })
        res.json({message: "Tarefa atualizada ", tarefa})
    } catch (error) {
        console.log("erro no update da tarefa")
    }
}
const deleteTarefa = async (req, res) => {
    const {id} = req.params
    try {
        const deletada = await prisma.tarefas.delete({where:{id: parseInt(id)}})
        res.json({message: "Tarefa deletada: ", deletada})
    } catch (error) {
        console.log("erro no delete da tarefa")
    }
}
module.exports = {postTarefa, getTarefa, updateTarefa, deleteTarefa}