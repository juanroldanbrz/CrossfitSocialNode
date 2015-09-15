/**
 * Created by root on 10/09/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    exerciseName: String,
    measure : String,
    value: Number,
    others : [ {name: String, measure: String, value: String} ],
    info: String
});


UserSchema.methods.fillFromTemplate = function(template) {
    var exerciseCreated = this;
    if(!template)
        var fatalerror = true;
    else {
        exerciseCreated.exerciseName = template.exerciseName;
        exerciseCreated.measure = template.measure;
        for (var i = 0; i < template.others.length; i++) {
            var dataToPush = {name: template.others[i].name, measure: template.others[i].measure, value: '0'};
            exerciseCreated.others.push(dataToPush);
        }

    }
};

module.exports = mongoose.model('exerciseCreated', UserSchema);

