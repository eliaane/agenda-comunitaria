const mongoose = require('mongoose');
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome:{
        type: String,
        required: true
    },
    sobrenome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuarios', UserSchema);