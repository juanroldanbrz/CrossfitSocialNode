/**
 * Created by root on 25/08/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    profile_nacionality : String,
    profile_country : String,
    profile_city : String,
    uid: mongoose.Schema.Types.ObjectId
    });

module.exports = mongoose.model('Location', UserSchema);