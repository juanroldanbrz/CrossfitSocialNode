/**
 * Created by root on 26/08/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    credit_level : Number,
    num_credits : Number
});

module.exports = mongoose.model('Clothes', UserSchema);