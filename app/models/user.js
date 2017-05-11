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
    currentBox: String,
    country : String,
    lastTry : { type : Date, default: Date.now },
    numOfTrys: { type : Number, default: 0 },
    countryFlag: String,
    isVerified: {type:Boolean,default:false},
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

UserSchema.methods.getAge = function() {
    var user = this;
    var cDate= new Date();
    var year = cDate.getFullYear();
    var month = cDate.getMonth();
    var day = cDate.getDay();
    var date1 = user.birthdate;
    var date2 = year+'-'+month+'-'+day;
    var dateParts1 = date1.split('-')
        , dateParts2 = date2.split('-')
        , d1 = new Date(dateParts1[0], dateParts1[1]-1, dateParts1[2])
        , d2 = new Date(dateParts2[0], dateParts2[1]-1, dateParts2[2])

    return new Date(d2 - d1).getYear() - new Date(0).getYear() ;

};

module.exports = mongoose.model('User', UserSchema);