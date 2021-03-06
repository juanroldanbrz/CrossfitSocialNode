var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    exerciseName: String,
    measure : String,
    others : [ {name: String, measure: String} ],
    canBePosted : {type:Boolean,default:false},
    toPost: [ {name: String, measure: String} ]

});

module.exports = mongoose.model('exerciseTemplate', UserSchema);