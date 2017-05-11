var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    type: String,
    time: String,
    repetitions: String,
    exercises : [ mongoose.Schema.Types.ObjectId ],
    info: String
});

module.exports = mongoose.model('set', UserSchema);
