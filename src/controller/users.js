//importando o mongoose
const mongoose = require('mongoose');
const users = require('../model/users');

//Cria um novo usuário
export function createUser(req, res) {
    const users = new users({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        password: req.body.password
    });

    return users.save()
        .then(() => res.json({ sucess: true, message: 'Usuário cadastrado com sucesso', statusCode: 201 }))
        .catch(err => res.json({ sucess: false, message: err, statusCode: 400 }));
}