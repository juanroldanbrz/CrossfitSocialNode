/**
 * Created by root on 23/09/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name : String,
    level : Number
});

module.exports = mongoose.model('Level', UserSchema);