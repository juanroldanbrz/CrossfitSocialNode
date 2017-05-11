var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    protein_trademark : String,
    carbo_trademark : String,
    bcaa_trademark : String,
    multivitamin_trademark : String,
    creatine_trademark : String,
    magnesium_trademark : String,
    omega3_trademark : String,
    uid: mongoose.Schema.Types.ObjectId
    });

module.exports = mongoose.model('Suplements', UserSchema);