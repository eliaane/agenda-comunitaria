const mongoose = require('mongoose');
const Usuario = require('../models/usuarios');

//Cria um novo usuario

exports.novoUsuario = function(req, res){
    const usuario = new Usuario({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha,
        confirmacaoSenha: req.body.senha
    });

    return usuario
    .save()
    .then((novoUsuario) => {
        return res.status(201).json({
            sucess: true,
            message: 'Usuario cadastrado com sucesso!!',
            Usuario: novoUsuario,
        }); 
    })
    .catch((error) =>{
        res.status(500).json({
            sucess: false,
            message: 'Erro no Servidor, por favor tente novamente',
            error: error.message,
        });
    });
}