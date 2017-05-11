var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    cleandandjerk : String,
    snatch : String,
    deadlift : String,
    backsquat : String,
    maxpullups : String
});

module.exports = mongoose.model('BenchmarkMaxes', UserSchema);