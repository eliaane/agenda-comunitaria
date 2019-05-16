const mongoose = require('mongoose');
mongoose.Promise = Promise;

const EventoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: false
    },
    data:{
        type: Date,
        required: true,
    },
    horario:{
        type: Date, //verificar!!
        required: true
    }
});

module.exports = mongoose.model('Eventos', EventoSchema);