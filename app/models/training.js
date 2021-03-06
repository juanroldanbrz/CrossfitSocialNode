var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    date: String,
    sets: [mongoose.Schema.Types.ObjectId],
    assistants : [ mongoose.Schema.Types.ObjectId ],
    maxPeople : Number,
    level : Number,
    description : String,
    createdAt:  { type : Date, default: Date.now },
    credits : Number, //Numero de creditos que cuesta el entrenamiento
    boxId: mongoose.Schema.Types.ObjectId
    });

module.exports = mongoose.model('Training', UserSchema);