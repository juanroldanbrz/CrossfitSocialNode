// config/passport.js
// load all the things we need
// load up the user model
var mongoose = require('mongoose');
var User = require('../app/models/user');
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config.js');
// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.key,
        consumerSecret: config.twitter.secret,
        callbackURL: '/auth/twitter/callback'
    },function(accessToken,refreshToken,profile,done){
        User.findOne({provider_id : profile.id}, function(err,newUser){
            if(err){throw err;}

            //Si existe en la BD, lo devuelve
            if(!err && newUser != null)return done(null,newUser);

            //Si no existe, lo crea

            var newUser = new User({
                provider_id : profile.id,
                provider : profile.provider,
                fullName : profile.displayName,
                profilePic : profile.photos[0].value,
                username : "twitter_"+profile.username,

            });

            newUser.save(function(err){
                if(err)throw err;
                done(null,newUser);
            });
        });
    }));

    passport.use(new FacebookStrategy({
        clientID: config.facebook.id,
        clientSecret: config.facebook.secret,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id','displayName','photos']
    },function(accessToken,refreshToken,profile,done){
        User.findOne({provider_id : profile.id}, function(err,user){
            if(err)throw err;

            //Si existe en la BD, lo devuelve
            if(!err && user != null)return done(null,user);

            //Si no existe, lo crea
            usr = 'facebook_'+profile.id;

            var newUser = new User({
                provider_id : profile.id,
                provider : profile.provider,
                fullName : profile.displayName,
                username: usr,
                profilePic : profile.photos[0].value
            });

            newUser.save(function(err){
                if(err)throw err;
                done(null,newUser);
            });
        });
    }));




    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },

        function(req, username, password, done) {
            if(username == '' || '' == null)
                return done(null, false, req.flash('signupMessage', 'Please fill all the data.'));
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ username :  username }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    throw err;

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                        newUser.username = username;
                        newUser.provider = 'local';
                    newUser.password = newUser.generateHash(password);

                    // set the user's local credentials

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        done(null,newUser);
                    });
                }

            });

        }));



    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ username :  username }, function(err, user) {
                if(err)
                // if there are any errors, return the error before anything elseif (err)
                    done(err)

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash


                if(triedMoreThanXMinAgo(user.lastTry)) {
                    user.numOfTrys = 0;
                    user.save(function (err) {
                        if (err)
                            throw err;
                    });
                }

                if(user.numOfTrys >= config.login.numberOfTries)
                    return done(null, false, req.flash('loginMessage', 'Login blocked. Wait ' + config.login.minutesBlocked + ' minutes to login again.'));

                // if no user is found, return the message

                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {

                    user.numOfTrys = user.numOfTrys + 1;
                    user.lastTry = new Date();
                    user.save(function (err) {
                        if (err)
                            throw err;
                    });

                    return done(null, false, req.flash('loginMessage', 'Error: Wrong password. You have '+ (config.login.numberOfTries - user.numOfTrys).toString() + ' tries left.'));
                }
                user.numOfTrys = 0;
                user.save(function (err) {
                    if (err)
                        throw err;
                });

                // all is well, return successful user
                done(null, user);
            });

        }));

};

function triedMoreThanXMinAgo(last_login){
    var now = new Date();
    var diffMs = (now - last_login);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return(diffMins > config.login.minutesBlocked);
}