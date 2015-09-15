/**
 * Created by root on 25/08/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    day: [String],
    sets: [mongoose.Schema.Types.ObjectId],
    assistants : [ mongoose.Schema.Types.ObjectId ],
    maxPeople : Number,
    level : Number,
    description : String,
    credits : Number, //Numero de creditos que cuesta el entrenamiento
    boxId: mongoose.Schema.Types.ObjectId
    });

module.exports = mongoose.model('Training', UserSchema);