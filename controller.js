const {client} = require('./db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const listUsers = async (req, res) => {
    res.send('ListaUsers Tudo Funcionou')
}


const createUsers = async (req, res) => {
    try {
        const {nome, email, senha} = req.body
        const senhacripto = await bcryptjs.hashSync(senha, 10)
        const sql = `INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3) RETURNING *`
        const dados = await client.query(sql, [nome, email, senhacripto])
        res.status(201).json({msg:'O usuario foi criado'})

    }catch(err){
        console.log(err)
        res.status(500).json({msg:'erro ao criar o usuario'})
    }
}

const updateUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const {nome, email} = req.body
        const sql = `UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *`
        const dados = await client.query(sql, [nome, email, id])
        console.log(dados)
        res.status(201).json({msg:'O usuario foi atualizado'})

    }catch(err){
        console.log(err)
        res.status(500).jason({msg:'erro ao atualizar o usuario'})
        

    }
}

const deleteUsers = async (req, res) => {
    try{
        const id = req.params.id;
    const sql = `DELETE FROM usuarios WHERE id = $1`
    const dados = await client.query(sql, [id])
    res.status(200).json({msg:'O usuario foi deletado'})
    }catch (err){
        console.log(err)
        res.status(500).jason({msg:'erro ao deletar o usuario'})
    }
    

}

const getUsers = async (req, res) => {
    res.send('getUsers Tudo Funcionou')
}


const login = async (req, res) => {
    try{
        const {email, senha} = req.body;
        const sql = `SELECT * FROM usuarios WHERE email = $1`
        const usuario = await client.query(sql, [email])
        const validPassword = bcryptjs.compareSync(senha, usuario.rows[0].senha)
        console.log(validPassword)

        res.send(200)

    }catch (err){
        console.log(err)
        res.send(500)
    }
}


module.exports = {listUsers, createUsers, updateUsers, deleteUsers, getUsers, login};
