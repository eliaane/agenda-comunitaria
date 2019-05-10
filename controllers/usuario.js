const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');

//Cria um novo usuario

exports.novoUsuario = function (req, res) {
    if (req.body.email && req.body.senha) {
        if (req.body.confirmacaoSenha && req.body.senha == req.body.confirmacaoSenha) {
            Usuario.findOne({ 'email': req.body.email })
                .then(usuario => {
                    if (usuario) {
                        res.json({
                            sucess: false,
                            message: 'E-mail já cadastrado, por favor insira outro e-mail'
                        });
                    } else {
                        bcryptjs.hash(req.body.senha, 10)
                            .then(hash => {
                                let senhaEncriptada = hash;

                                let usuario = new Usuario({
                                    _id: mongoose.Types.ObjectId(),
                                    nome: req.body.nome,
                                    sobrenome: req.body.sobrenome,
                                    email: req.body.email,
                                    senha: senhaEncriptada
                                });

                                return usuario
                                    .save()
                                    .then((novoUsuario) => res.json({ sucess: true, message: 'Usuario cadastrado com sucesso!!', Usuario: novoUsuario }))
                                        .catch((error) => res.json({ sucess: false, message: 'Erro no Servidor, por favor tente novamente', error: error.message }))
                            })
                            .catch(error => res.json({ sucess: false, message: 'Erro no Servidor, por favor tente novamente', error: error.message }));
                    }
                })
        } else {

            res.json({ success: false, message: 'Senhas não coincidem, tente novamente!!', statusCode: 400 });
        }

    } else {

        res.json({ success: false, message: 'Por favor, insira seu E-mail e/ou Senha', statusCode: 400 });
    }
}