const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');


exports.novoUsuario = function (req, res) {
    if (req.body.nome && req.body.sobrenome && req.body.email && req.body.senha) {//Verifica se todos os campos foram preenchidos
        if (req.body.confirmacaoSenha && req.body.senha == req.body.confirmacaoSenha) {//verifica se a senha e a confirmação de senha são iguais
            Usuario.findOne({ 'email': req.body.email })//verifica se o e-mail inserido já não foi cadastrado
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

                                //Cria um novo usuario
                                let usuario = new Usuario({
                                    _id: mongoose.Types.ObjectId(),
                                    nome: req.body.nome,
                                    sobrenome: req.body.sobrenome,
                                    email: req.body.email,
                                    senha: senhaEncriptada
                                });

                                return usuario
                                    .save()
                                    .then((novoUsuario) =>
                                        res.json({
                                            sucess: true,
                                            message: 'Usuario cadastrado com sucesso!!',
                                            Usuario: novoUsuario
                                        }))
                                    .catch((error) =>
                                        res.json({
                                            sucess: false,
                                            message: 'Erro no Servidor, por favor tente novamente',
                                            error: error.message
                                        }))
                            })
                            .catch(error =>
                                res.json({
                                    sucess: false,
                                    message: 'Erro no Servidor, por favor tente novamente',
                                    error: error.message
                                }));
                    }
                })
        } else {

            res.json({
                success: false,
                message: 'Senhas não coincidem, tente novamente!!',
                statusCode: 400
            });
        }

    } else {

        res.json({
            success: false,
            message: 'Por favor, preencha todos os campos de cadastro!!',
            statusCode: 400
        });
    }
}