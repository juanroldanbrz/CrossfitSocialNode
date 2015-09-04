/**
 * Created by root on 25/08/15.
 */
/**
 * Created by root on 25/08/15.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    profile : mongoose.Schema.Types.ObjectId,
    training : mongoose.Schema.Types.ObjectId,
    comment_text : String,
    createdAt:  { type : Date, default: Date.now }
});

module.exports = mongoose.model('Comments', UserSchema);