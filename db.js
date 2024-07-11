const { Client } = require('pg')

const client = new Client({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})



const connectDB = async () => {
    client
    .connect()
    .then(()  => {
        console.log('conecçao funcionou');
    }).catch((err) => {
        console.error('errou miseravi')
    });
};


const setup = async (req, res) => {
    try {
        const data = await client.query('CREATE TABLE usuarios (nome VARCHAR(100), email VARCHAR(100), id SERIAL PRIMARY KEY, senha VARCHAR(20))')
        res.status(200).json({msg:'A TABELA NASCEU'})
    } catch (err) {
        console.log('Deu erro nessa merda de tabela ai meu')
        res.status(500)
    }
}



module.exports = {connectDB, setup, client}