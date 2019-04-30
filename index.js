var express = require('express'),
    http = require('http'),
    path = require('path'),
    UserDao = require('./src/model/users'),
    app = express();


app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

app.get('/exemplo', (req, res) => {
    UserDao.find().then((users) => {
        res.render('index', { users: users });
    });
});

http.createServer(app).listen(3000);

console.log('Rodando na porta 3000');