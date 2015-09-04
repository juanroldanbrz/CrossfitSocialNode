/**
 * Created by root on 25/08/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    day: [String],
    assistants : [ mongoose.Schema.Types.ObjectId ],
    comments : [ mongoose.Schema.Types.ObjectId ],
    members: [ mongoose.Schema.Types.ObjectId ],
    type : String,
    text : String,
    vote : Number,
    credits : Number, //Numero de creditos que cuesta el entrenamiento
    photo : String
    });

module.exports = mongoose.model('Training', UserSchema);