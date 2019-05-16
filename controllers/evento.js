const mongoose = require('mongoose');
const Evento = require('../models/eventos');

//Cria um novo evento

exports.novoEvento = function(req, res){
    const evento = new Evento({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome,
        descricao: req.body.descricao,
        data: req.body.data,
        horario: req.body.horario,
    });

    return evento
    .save()
    .then((novoEvento) => {
        return res.status(201).json({
            sucess: true,
            message: 'Evento cadastrado com sucesso!!',
            Evento: novoEvento,
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