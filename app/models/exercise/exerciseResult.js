/**
 * Created by root on 10/09/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    exerciseName: String,
    measure : String,
    number: Number,
    others : [ {name: String, measure: String} ],
    info: String
});


UserSchema.methods.fillFromTemplate = function(template) {
    var exerciseCreated = this;
    var newMembers = [];
    for(var i=0;i<box.members.length;i++)
        if (! (box.members[i].user.toHexString() == uid))
            newMembers.push(box.members[i]);

    box.members = newMembers;

};

module.exports = mongoose.model('exerciseResult', UserSchema);





