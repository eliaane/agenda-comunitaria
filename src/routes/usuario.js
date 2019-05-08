const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuario');

//Request para acessar a View
router.get('/', function (req, res) {
    res.render('index');
});

//Request para criar um novo usuário
router.post('/usuario', usuarioController.novoUsuario);

module.exports = router;