const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuario');

router.get('/', function(req, res, next) {
    res.render('index');
  });

//Request para criar um novo usuário
router.post('/agenda', usuarioController.novoUsuario);

module.exports = router;