var mongoose = require('mongoose');

var userOfBox = new mongoose.Schema({
    user : mongoose.Schema.Types.ObjectId,
    isVerified: { type : Boolean, default: false }
});

var UserSchema = new mongoose.Schema({
    name : String,
    owner : mongoose.Schema.Types.ObjectId, //Link al ID del usuario administrador
    address : String,
    country : String,
    city : String,
    description: String,
    introduction_message : String,
    boxPicture: {type: String, default: '/img/not_found.jpg'},
    tariffs : String,
    userLimit: Number, //Maximo numero de usuarios
    trainings_types : [ mongoose.Schema.Types.ObjectId ], //link a los diferentes entrenamientos
    board_messages : [String], //Historial¿
    members : [ userOfBox ], //lista de miembros
    createdAt:  { type : Date, default: Date.now }
});

UserSchema.methods.removeMember = function(uid) {
    var box = this;
    var newMembers = [];
    for(var i=0;i<box.members.length;i++)
        if (! (box.members[i].user.toHexString() === uid))
            newMembers.push(box.members[i]);

    box.members = newMembers;

};

UserSchema.methods.isVerified = function(uid) {
    var box = this;
    for(var i=0;i<box.members.length;i++)
        if ((box.members[i].user.toHexString() == uid))
            return(box.members[i].isVerified);


};

UserSchema.methods.verify = function(uid) {
    var box = this;
    for(var i=0;i<box.members.length;i++)
    {
        if ((box.members[i].user.toHexString() == uid)){
            box.members[i].isVerified = true;
            break;
        }
    }

};

UserSchema.methods.unVerify = function(uid) {
    var box = this;
    for(var i=0;i<box.members.length;i++)
        if ((box.members[i].user.toHexString() === uid)){
            box.members[i].isVerified = false;
            break;
        }
};

UserSchema.methods.addMember = function(uid,verified) {
    if(verified ==null) verified = false;
    var box = this;
    box.members.push({user:uid,isVerified:verified});
};

module.exports = mongoose.model('Box', UserSchema);
