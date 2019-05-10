//importar dependências do projeto
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');


const UsuarioRouter = require('./routes/usuario');


const app = express();

//Configurando conexão com banco de dados
mongoose.connect('mongodb://agenda:agenda123@ds151086.mlab.com:51086/db-agenda', {useNewUrlParser: true})
.then(() => {
    console.log('Conexão com banco de dados realizada com sucesso');
})
.catch((error) => {
    console.log('Erro na conexão com o banco de dados', error);
});

//Configurando mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Configurando dependências do projeto
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//Configurando Passport
app.use(expressSession({
    secret: 'session secreta',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

//Configurando rotas
app.use('/', UsuarioRouter);



//Configurando porta
const porta = process.env.port || 3000;

app.listen(porta, () =>{
    console.log(`Servidor rodando na porta ${porta}`);
});

module.exports = app;