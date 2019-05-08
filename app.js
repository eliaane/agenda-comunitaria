//importar dependências do projeto
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const UsuarioRouter = require('./src/routes/usuario');

//configurar dependências do projeto
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

//Configurando conexão com banco de dados
mongoose.connect('mongodb://agenda:agenda123@ds151086.mlab.com:51086/db-agenda', {useNewUrlParser: true})
.then(() => {
    console.log('Conexão com banco de dados realizada com sucesso');
})
.catch((error) => {
    console.log('Erro na conexão com o banco de dados', error);
});


//Configurando porta
const porta = process.env.port || 3000;

//Configurando mecanismo de visualização
app.set('views', __dirname + './views');
app.set('view engine', 'ejs');


//Configurando rotas
app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Bem vindo a agenda comunitária',
    });
});

app.use('/', UsuarioRouter);

app.listen(porta, () =>{
    console.log(`Servidor rodando na porta ${porta}`);
});

module.exports = app;