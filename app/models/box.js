/**
 * Created by root on 25/08/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name : String,
    owner : mongoose.Schema.Types.ObjectId, //Link al ID del usuario administrador
    address : String,
    country : String,
    city : String,
    description: String,
    introduction_message : String,
    boxPicture: {type: String, default: '/img/not_found.jpg'},
    tariffs : String,
    userLimit: Number, //Maximo numero de usuarios
    trainings_types : [ mongoose.Schema.Types.ObjectId ], //link a los diferentes entrenamientos
    board_messages : [String], //Historial¿
    members : [ mongoose.Schema.Types.ObjectId ], //lista de miembros
    createdAt:  { type : Date, default: Date.now }
});

module.exports = mongoose.model('Box', UserSchema);