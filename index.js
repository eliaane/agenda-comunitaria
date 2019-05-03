//importando as dependencias 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const UserDao = require('./src/model/users');

//configura as depedencias

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configurando a view
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

//Firewall da UTFPR bloqueia a conexão com o mlab
//configurando o banco de dados
const uri = 'mongodb://agenda:agenda123@ds151086.mlab.com:51086/db-agenda';
mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
        console.log('Banco de dados conectado com sucesso');
    }).catch((error) => {
        console.log('Deu Ruim - Erro na conexão com o banco de dados', error);
    });


//configurando a porta
const port = process.env.port || 8000;

//configurando a rota
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Bem vindo!!"
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});