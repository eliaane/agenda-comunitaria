//importar dependências do projeto
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const UsuarioRouter = require('./src/routes/usuario');



//Configurando dependências do projeto
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

//Configurando mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');    // Setamos que nossa engine será o ejs
app.use(expressLayouts)          // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação


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


//Configurando rotas
 app.get('/', (req, res) =>{
    res.render('index');
});

/* app.get('/', (req, res) => {
    res.render('index');
});
   */

app.use('/', UsuarioRouter);





app.listen(porta, () =>{
    console.log(`Servidor rodando na porta ${porta}`);
});

module.exports = app;