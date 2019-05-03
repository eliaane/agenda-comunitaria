//importanto o mongoose;
const mongoose = require('mongoose');

//Atribuindo o Schema a variável Schema
const Schema = mongoose.Schema;

//criando o schema que será usado para armazenar o usuário
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    sobrenome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

//exportando o novo schema
module.exports = mongoose.model('User', userSchema);