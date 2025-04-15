const express = require("express")
const bcrypt = require("bcrypt")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
// FAZER LOGIN DO USUARIO

const registrar = async(req, res)=>{
    const {nome, email, senha} = req.body
    try {
        const validaExistente = await prisma.usuario.findUnique({
            where: {email}
        })
        if(validaExistente){
            return res.status(400).json({ erro: "E-mail já cadastrado" });
        }
        const senhaHash = await bcrypt.hash(senha, 10)
        const novoUsuario = await prisma.usuario.create({
            data: {nome, email, senha: senhaHash}
        })
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: novoUsuario.nome })
    } catch (error) {
        console.log("Erro na criacao de usuário")
    }
}
const login = async(req, res)=>{
    const {email, senha} = req.body
    try {
        const usuario = await prisma.usuario.findUnique({where: {email}})
        if(!usuario){
            return res.status(401).json({erro: "Dados inválidos"})
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if(!senhaCorreta){
            return res.status(401).json({erro: "Dados inválidos"})
        }
        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            process.env.JWT_SECRET || "segredo", 
            { expiresIn: "1h" }
        )
        res.status(200).json({ mensagem: "Login bem-sucedido", token });
    } catch (error) {
        console.log(error)
    }
}
const perfil =  async (req, res) =>{
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {id: req.usuario.id},
            select: {id: true, nome: true, email: true}
        })
        if(!usuario){
            console.log("Usuário não encontrado")
        }
        res.json(usuario)
    } catch (error) {
        console.log(error +" no /perfil")
    }
}
module.exports = { registrar, login, perfil };