/**
 * Created by root on 25/08/15.
 */
var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    provider: String,
    firstName: String, //opcional
    lastName: String, //opcional
    fullName: String,
    name: String,
    surname: String,
    provider_id: String,
    profilePic : {type: String, default: '/img/user_not_found.jpg'},
    birthdate: String,
    enabled: Boolean,
    confirmed: Boolean,
    registerCompleted: { type : Boolean, default: false },
    deleted: Boolean,
    createdAt:  { type : Date, default: Date.now },
    credits: [mongoose.Schema.Types.ObjectId],
    creditsExpire : Date,
    phone: String,
    maxBox: { type : Number, default: 1 },
    numBox: { type : Number, default: 0 },
    country : String,
    lastTry : { type : Date, default: Date.now },
    numOfTrys: { type : Number, default: 0 },
    countryFlag: String,
    isOwner: { type : Boolean, default: false },
    favorites: [ mongoose.Schema.Types.ObjectId ], //Array of favorite friends User._id
    about_crossfit : mongoose.Schema.Types.ObjectId, //Reference to AboutCrossfit._id
    benchmarks_workouts : mongoose.Schema.Types.ObjectId, //Reference to BenchmarkWorkouts._id
    benchmarks_maxes : mongoose.Schema.Types.ObjectId //Reference to BenchmarkMaxes._id



});

UserSchema.methods.getFlag = function(country) {
    return 'flag';
};


UserSchema.pre('save', function(callback) {
    var user = this;
    user.username = user.username.toLowerCase();
    if ((typeof(user.firstName) !== "undefined") && (typeof(user.lastName) !== "undefined")){
        user.fullName = user.firstName+" "+user.lastName;
    }
    return callback();
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);