const{Schema, model} = require('mongoose');

const schema = new Schema({
    login:{type:'String', required: true, unique: true},
    password:{type:'String', required: true},
    email:{type:'String', required: true, unique: true},
    dataRegistration:{type:'String'},
    isDeleted: false,
    isBlocked: false
})
module.exports = model('User',schema)