var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    exerciseName: String,
    measure : String,
    value: Number,
    others : [ {name: String, measure: String, value: String} ],
    info: String,
    canBePosted : {type:Boolean,default:false},
    wantToBePosted : {type:Boolean,default:false},
    toPost: [ {name: String, measure: String,value: String} ]

});

UserSchema.methods.fillFromTemplate = function(template) {
    var exerciseCreated = this;
    if(!template)
        var fatalerror = true;
    else {
        exerciseCreated.exerciseName = template.exerciseName;
        exerciseCreated.measure = template.measure;
        exerciseCreated.isPostable = template.isPostable;

        for (var i = 0; i < template.others.length; i++) {
            var dataToPush = {name: template.others[i].name, measure: template.others[i].measure, value: '0'};
            exerciseCreated.others.push(dataToPush);
        }

        for (var i = 0; i < template.toPost.length; i++) {
            var dataToPush = {name: template.toPost[i].name, measure: template.toPost[i].measure, value: '0'};
            exerciseCreated.others.push(dataToPush);
        }

    }
};

module.exports = mongoose.model('exerciseCreated', UserSchema);

