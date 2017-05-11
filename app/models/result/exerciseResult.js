var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    exerciseID: mongoose.Schema.Types.ObjectId,
    trainingID: mongoose.Schema.Types.ObjectId,
    toPost: [ {name: String, measure: String, value:String} ]
});

module.exports = mongoose.model('exerciseTemplate', UserSchema);