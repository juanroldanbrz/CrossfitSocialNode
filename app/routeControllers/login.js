var csrf = require
var User = require('../models/user');
var fs    = require("fs");
var config = require('../../config/config');
var nodemailer = require("nodemailer");
var generatePassword = require('password-generator');
var middleware = require('../middleware/loginMiddleware.js');
var formValidator = require('../utils/formValidator.js');

module.exports = function(app, passport) {

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter',
        { successRedirect: '/',
            failureRedirect: '/' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        { successRedirect: '/',
            failureRedirect: '/login' }));
    app.get('/logout',middleware.isLoggedIn,function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),function(req,res){
        if(req.user.registerCompleted)res.redirect('/main');
        else res.redirect('/completedata');
    });

    app.post('/remember_me',function(req,res){
        if(req.body.username === null || req.body.username == '' )
            res.redirect('/');

        else {
            User.findOne({username : req.body.username},function(err, user) {
            if(err)
                throw err;
            if(user == null)
                return res.render('gym/index',{rememberme: 'Error. User not found'});
            if(user.email==null)
                return res.render('gym/index',{rememberme: 'Error. The user didn\'t finish the register. We can\'t recover the password.'});

            newPass = generatePassword(12, false);
            user.password = user.generateHash(newPass);
            user.save();

            var smtpTransport = nodemailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: config.gmail.user,
                    pass: config.gmail.pass
                }
            });
            var mailOptions = {
                to: user.email,
                subject: 'New password of myWebsite',
                text: 'Your new password is ' + newPass
            };
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    res.render('gym/index',{rememberme: 'Error. Conctact with the staff'});
                } else {
                    console.log("Message sent: " + response.message);
                    res.render('gym/index',{rememberme: 'Password reset. Check the mail'});
                }
            });
        });
        }
    });

    app.post('/completeData',middleware.isLoggedIn, function(req, res){
            if(formValidator.isAValidInput(req,['birthdate','name','surname','country','phone','email'])){
                User.findById(req.user._id, function(err, myUser) {
                // if there are any errors, return the error
                if (err)
                    throw err;
                if (!myUser)
                    res.redirect('/');
                else {
                    User.findOne({email : req.body.email},function(err, user){
                        if(err)
                        throw err;
                        if(user)
                            res.render('gym/index',{completeRegister: true,email:'The email is already taken '});
                        else {
                            req.user.country = req.body.country;
                            req.user.email = req.body.email;
                            req.user.name = req.body.name;
                            req.user.surname = req.body.surname;
                            req.user.fullName = req.body.name + " " + req.body.surname;
                            req.user.phone = req.body.phone;
                            req.user.birthdate = req.body.birthdate;
                            req.user.registerCompleted = true;

                            myUser.birthdate = req.body.birthdate;
                            myUser.country = req.body.country;
                            myUser.email = req.body.email;
                            myUser.name = req.body.name;
                            myUser.surname = req.body.surname;
                            myUser.fullName = req.body.name + " " + req.body.surname;
                            myUser.phone = req.body.phone;
                            myUser.registerCompleted = true;

                            if (req.files.profilePic === null) {
                                myUser.save(function (err) {
                                    if (err)
                                        throw err;
                                    res.redirect('/main');
                                });

                            }
                            else {
                                fs.readFile(req.files.profilePic.path, function (err, data) {
                                    var newPath = __dirname + "/../../public/img/profile/" + myUser._id;

                                    fs.writeFile(newPath, data, function (err) {
                                        if (err)
                                            throw err;
                                        myUser.profilePic = "/img/profile/" + myUser._id;
                                        req.user.profilePic = "/img/profile/" + myUser._id;
                                        myUser.save(function (err) {
                                            if (err)
                                                throw err;
                                            res.redirect('/main');

                                        });

                                    });
                                });

                            }
                        }
                    });
                }
            });

        } else res.redirect('/');
    });

    app.get('/completeData',middleware.isLoggedIn, function(req, res){
        res.render('gym/index',{completeRegister: true,csrf: req.csrfToken()});
                //name, surname, avatar, email,country,phone
    });

    app.get('/login', function(req, res){
        error = req.flash('loginMessage')[0];
        if(error===null) {
            res.render('gym/index', {error: 'Please fill all the data.', csrf: req.csrfToken()});
        }
        else {
            res.render('gym/index', {error: error, csrf: req.csrfToken()});
        }
    });

    app.get('/signup', function(req, res){
        error = req.flash('signupMessage')[0];
        if(error==null)
            res.render('gym/index',{error: 'Please fill all the data.'});
        else
            res.render('gym/index',{error: error});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/completedata', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


};

