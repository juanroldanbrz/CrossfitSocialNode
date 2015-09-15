/**
 * Created by root on 10/09/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    exerciseName: String,
    measure : String,
    others : [ {name: String, measure: String} ]
});

module.exports = mongoose.model('exerciseTemplate', UserSchema);