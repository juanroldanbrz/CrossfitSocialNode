/**
 * Created by root on 10/09/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    type: String,
    exercises : [ mongoose.Schema.Types.ObjectId ],
    info: String
});

module.exports = mongoose.model('set', UserSchema);
