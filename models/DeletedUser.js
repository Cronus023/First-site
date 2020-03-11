const{Schema, model} = require('mongoose');

const schema = new Schema({
    login:{type:'String', required: true, unique: true},
    password:{type:'String', required: true},
    email:{type:'String', required: true, unique: true},
    isDeleted: {type:'Boolean', required: true},
})
module.exports = model('DeletedUsers',schema)