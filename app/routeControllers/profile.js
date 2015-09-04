/**
 * Created by root on 31/08/15.
 */
var middleware = require('../middleware/loginMiddleware.js')
var Clothes = require('../models/clothes');
var User = require('../models/user');
var BenchmarkWorkout = require('../models/benchmarkWorkouts');
var fs    = require("fs");
var Suplements = require('../models/suplements');

module.exports = function(app) {

    //Get profile info (basic info from the session)
    app.post('/profile',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            var userProfile = {
                status: 'no_error',
                fullName: req.user.fullName,
                email: req.user.email,
                phone: req.user.phone,
                profilePic : req.user.profilePic,
                birthdate: req.user.birthdate,
                credits : 0};

            res.send(userProfile);
        }

    });

    app.post('/profile/getProfilePic',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null)

            res.send({status:'no_error',profilePic : req.user.profilePic});
        else
            res.send({status:'error'})

    });
    //Modify profile info (basic info from the session)
    app.post('/profile/edit',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            User.findById(req.user._id, function (err, user) {
                if(err)
                    throw err;
                if(!user)
                    res.send({status:'Unexpected error'});

                user.birthdate = req.body.birthdate;
                req.user.birthdate = req.body.birthdate;
                req.user.email = req.body.email;
                user.email = req.body.email;
                user.phone = req.body.phone;
                req.user.phone = req.body.phone;

                if (req.files.profilePic != null) {
                    fs.readFile(req.files.profilePic.path, function (err, data) {
                        var newPath = __dirname+"/../../public/img/profile/"+user._id;

                        fs.writeFile(newPath, data, function (err) {
                            if(err)
                                res.send({status:'error'});
                            else {
                                user.profilePic = "/img/profile/" + user._id;
                                req.user.profilePic = "/img/profile/" + user._id;
                                user.save(function (err) {
                                    if (err)
                                        res.send({status: 'error'});
                                    res.send({status: 'no_error'});

                                });
                            }

                        });
                    });
                }
                else
                { user.save(function(err) {
                    if (err)
                        res.send({status:'error'});
                    res.send({status:'no_error'});

                });
                }



            })

        }

    });

    app.post('/profile/change_password',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null && req.body.newPassword != ''  && req.body.oldPassword != '' && req.body.newPassword != null  && req.body.oldPassword != null){
            User.findById(req.user._id, function (err, user) {
                if (err)
                    throw err;
                if (!user)
                    res.send({status:'error'});
                else{
                    if(user.validPassword(req.body.oldPassword)){
                        user.password = user.generateHash(req.body.newPassword);
                        user.save();
                        res.send({status:'no_error'});
                    }
                    else
                    res.send({status:'error'});
                }
            });
        } else res.send({status:'error'});

    });


    app.post('/profile/clothes',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            Clothes.findOne({uid: req.user._id}, function(err, clothes) {
                if (err)
                    throw err;
                if (!clothes)
                    res.send({status:'error'});
                else {
                    var userClothes = {
                        status: 'no_error',
                        shoe_trademark: clothes.shoe_trademark,
                        shoe_model: clothes.shoe_model,
                        hand_grips_trademark: clothes.hand_grips_trademark,
                        gloves_trademark: clothes.gloves_trademark
                    };
                    res.send(userClothes);
                }

            });
        }


    });
    app.post('/profile/clothes/edit',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            Clothes.findOne({uid: req.user._id}, function(err, clothes) {
                if (err)
                    throw err;
                if (!clothes){
                    clothes = new Clothes();
                    clothes.uid = req.user._id;
                }
                clothes.shoe_trademark = req.body.shoe_trademark;
                clothes.shoe_model = req.body.shoe_model;
                clothes.hand_grips_trademark = req.body.hand_grips_trademark;
                clothes.gloves_trademark = req.body.gloves_trademark;
                clothes.save();
                res.send({status:'no_error'});
                });

        }});

    app.post('/profile/suplements',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            Suplements.findOne({uid: req.user._id}, function(err, suplements) {
                if (err)
                    throw err;
                if (!suplements)
                    return {status:'error'};
                else {
                    var userSuplements = {
                        status:'no_error',
                        protein_trademark: suplements.protein_trademark,
                        carbo_trademark: suplements.carbo_trademark,
                        bcaa_trademark: suplements.bcaa_trademark,
                        multivitamin_trademark: suplements.multivitamin_trademark,
                        creatine_trademark: suplements.creatine_trademark,
                        magnesium_trademark: suplements.magnesium_trademark,
                        omega3_trademark: suplements.omega3_trademark

                    };
                    res.send(userSuplements);
                }

            });

    }});
    app.post('/profile/suplements/edit',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            Suplements.findOne({uid: req.user._id}, function(err, suplements) {
                if (err)
                    throw err;
                if (!suplements){
                    suplements = new Suplements();
                    suplements.uid = req.user._id;
                }
                suplements.protein_trademark= req.body.protein_trademark,
                suplements.carbo_trademark = req.body.carbo_trademark,
                suplements.bcaa_trademark= req.body.bcaa_trademark,
                suplements.multivitamin_trademark= req.body.multivitamin_trademark,
                suplements.creatine_trademark= req.body.creatine_trademark,
                suplements.magnesium_trademark= req.body.magnesium_trademark,
                suplements.omega3_trademark= req.body.omega3_trademark,
                suplements.save();
                res.send({status:'no_error'});

            });

        }});

    app.post('/profile/benchmark',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            BenchmarkWorkout.findOne({uid: req.user._id}, function(err, benchmark) {
                if (err)
                    throw err;
                if (!benchmark)
                    return {status:'error'};
                else {
                    var userBenchmark = {
                        status:'no_error',
                        fran: benchmark.fran,
                        helen: benchmark.helen,
                        grace: benchmark.grace,
                        fifth50: benchmark.fifth50,
                        fightgonebad: benchmark.fightgonebad,
                        sprint400m: benchmark.sprint400m,
                        run5k: benchmark.run5k
                    };
                    res.send(userBenchmark);
                }

            });

        }});

    app.post('/profile/benchmark/edit',middleware.isLoggedAndFullRegistered,function(req,res){
        if(req.user._id != '' && req.user._id != null){
            BenchmarkWorkout.findOne({uid: req.user._id}, function(err, benchmark) {
                if (err)
                    throw err;
                if (!benchmark){
                    benchmark = new BenchmarkWorkout();
                    benchmark.uid = req.user._id;
                }
                    benchmark.fran= req.body.fran,
                    benchmark.helen = req.body.helen,
                    benchmark.grace= req.body.grace,
                    benchmark.fifth50= req.body.fifth50,
                    benchmark.fightgonebad= req.body.fightgonebad,
                    benchmark.sprint400m= req.body.sprint400m,
                    benchmark.run5k= req.body.run5k,
                    benchmark.save();
                res.send({status:'no_error'});

            });

        }});
}
