var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    fran : Number,
    helen : Number,
    grace : Number,
    fifth50 : Number,
    fightgonebad : Number,
    sprint400m : Number,
    run5k : Number,
    uid: String
});

module.exports = mongoose.model('BenchmarkWorkouts', UserSchema);