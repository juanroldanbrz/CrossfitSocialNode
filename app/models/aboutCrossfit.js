var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    hasLicense : Boolean,
    isReferee : Boolean,
    license_type : String
});

module.exports = mongoose.model('AboutCrossfit', UserSchema);