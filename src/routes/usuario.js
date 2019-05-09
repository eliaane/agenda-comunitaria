const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuario');


//Request para criar um novo usuário
router.post('/usuario', usuarioController.novoUsuario);

module.exports = router;