/**
 * Created by root on 25/08/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    shoe_trademark : String,
    shoe_model : String,
    hand_grips_trademark : String,
    gloves_trademark : String,
    uid: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Clothes', UserSchema);